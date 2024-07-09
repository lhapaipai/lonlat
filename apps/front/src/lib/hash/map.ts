import { BaseLayerId, baseLayersById } from "~/features/map/layers";
import { MapState } from "~/features/map/mapSlice";

export function stringifyMap(mapState: MapState) {
  const {
    baseLayer,
    viewState: { bearing, pitch, center, zoom },
  } = mapState;
  const roundedZoom = Math.round(zoom * 100) / 100;
  // derived from equation: 512px * 2^z / 360 / 10^d < 0.5px
  const precision = Math.ceil(
    (roundedZoom * Math.LN2 + Math.log(512 / 360 / 0.5)) / Math.LN10,
  );
  const m = Math.pow(10, precision);
  const lng = Math.round(center[0] * m) / m;
  const lat = Math.round(center[1] * m) / m;

  let hash = `${baseLayer}/${roundedZoom}/${lng}/${lat}`;

  if (bearing || pitch) {
    hash += `/${Math.round(bearing * 10) / 10}`;
  }
  if (pitch) {
    hash += `/${Math.round(pitch * 10) / 10}`;
  }

  return hash;
}

export function parseMapHash(pathname: string): MapState | null {
  if (pathname === "/") {
    return null;
  }
  try {
    const [unknownBaseLayer, zoomStr, lngStr, latStr, bearingStr, pitchStr] =
      pathname.split("/").slice(1);
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
      optionalLayers: [],
      terrain: false,
      streetView: false,
    };
  } catch (err) {
    return null;
  }
}
