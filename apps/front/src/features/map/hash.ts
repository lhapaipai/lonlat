import {
  BaseLayerId,
  baseLayersById,
  OptionalLayerId,
  optionalLayersById,
} from "./layers";
import { MapState } from "./mapSlice";

export function stringifyMap(mapState: MapState) {
  const {
    baseLayer,
    viewState: { bearing, pitch, center, zoom },
    terrain,
    streetView,
    optionalLayers,
  } = mapState;
  const roundedZoom = Math.round(zoom * 100) / 100;
  // derived from equation: 512px * 2^z / 360 / 10^d < 0.5px
  const precision = Math.ceil(
    (roundedZoom * Math.LN2 + Math.log(512 / 360 / 0.5)) / Math.LN10,
  );
  const m = Math.pow(10, precision);
  const lng = Math.round(center[0] * m) / m;
  const lat = Math.round(center[1] * m) / m;

  const bashHash = `${baseLayer}/${roundedZoom}/${lng}/${lat}`;

  if (bearing || pitch || terrain || streetView || optionalLayers.length > 0) {
    const roundedBearing = Math.round(bearing * 10) / 10;
    const roundedPitch = Math.round(pitch * 10) / 10;
    const allOptionalLayerIds = optionalLayers.slice();
    if (terrain) {
      allOptionalLayerIds.push("terrain");
    }
    return `${bashHash}/${roundedBearing}/${roundedPitch}/${allOptionalLayerIds.join("|")}`;
  }

  return bashHash;
}

export function parseMapHash(pathname: string): MapState | null {
  if (pathname === "/") {
    return null;
  }
  try {
    const [
      unknownBaseLayer,
      zoomStr,
      lngStr,
      latStr,
      bearingStr,
      pitchStr,
      otherLayersStr,
    ] = pathname.split("/").slice(1);
    const center: [number, number] = [parseFloat(lngStr), parseFloat(latStr)];
    const zoom = parseFloat(zoomStr);

    if (isNaN(center[0]) || isNaN(center[1]) || isNaN(zoom)) {
      return null;
    }

    let bearing = bearingStr ? parseFloat(bearingStr) : 0;
    let pitch = pitchStr ? parseFloat(pitchStr) : 0;

    if (isNaN(bearing)) {
      bearing = 0;
    }
    if (isNaN(pitch)) {
      pitch = 0;
    }

    let terrain = false;
    let optionalLayers: OptionalLayerId[] = [];

    if (otherLayersStr) {
      const existingOptionalLayerIds = Object.keys(optionalLayersById);
      const otherLayers = otherLayersStr.split("|");

      terrain = otherLayers.includes("terrain");
      optionalLayers = otherLayers.filter(
        (layerId) =>
          layerId !== "terrain" &&
          layerId !== "street-view" &&
          existingOptionalLayerIds.includes(layerId),
      ) as OptionalLayerId[];
    }

    const baseLayer: BaseLayerId = baseLayersById[
      unknownBaseLayer as BaseLayerId
    ]
      ? (unknownBaseLayer as BaseLayerId)
      : "ign-raster-default_scan";
    return {
      baseLayer,
      viewState: {
        center,
        zoom,
        bearing,
        pitch,
      },
      optionalLayers,
      terrain,
      streetView: false,
    };
  } catch (err) {
    return null;
  }
}
