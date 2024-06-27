import { CustomGeoOption } from "pentatrion-geo";
import { customRound } from "pentatrion-geo/geo-options/util";
import { SearchState } from "~/features/search/searchSlice";
import { ViewState } from "~/store/mapSlice";
import { HashData, SearchHash } from "~/types/hash";

export function getHashString(
  baseLayer: string,
  viewState: ViewState,
  searchState: SearchState,
) {
  const { bearing, pitch, center } = viewState;
  const zoom = Math.round(viewState.zoom * 100) / 100;
  // derived from equation: 512px * 2^z / 360 / 10^d < 0.5px
  const precision = Math.ceil(
    (zoom * Math.LN2 + Math.log(512 / 360 / 0.5)) / Math.LN10,
  );
  const m = Math.pow(10, precision);
  const lng = Math.round(center[0] * m) / m;
  const lat = Math.round(center[1] * m) / m;

  let hash = `${baseLayer}/${zoom}/${lng}/${lat}`;

  if (bearing || pitch) {
    hash += `/${Math.round(bearing * 10) / 10}`;
  }
  if (pitch) {
    hash += `/${Math.round(pitch * 10) / 10}`;
  }

  const searchParams = new URLSearchParams();
  if (searchState.readOnly) {
    const searchStr = stringifySearch(searchState);
    searchStr && searchParams.set("search", searchStr);
  }

  return searchParams.size === 0
    ? `#${hash}`
    : `#${hash}?${searchParams.toString()}`;
}

export function parseHashString(rawHash: string): HashData | null {
  const hash = rawHash.replace("#", "");
  if (hash === "") {
    return null;
  }
  const { pathname, searchParams } = new URL(hash, "http://prefix.local");

  const [baseLayer, zoomStr, lngStr, latStr, bearingStr, pitchStr] = pathname
    .split("/")
    .slice(1);
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

  return {
    baseLayer: baseLayer,
    viewState: {
      center,
      zoom,
      bearing,
      pitch,
    },
    search: parseSearchString(searchParams.get("search")),
  };
}

function encode(str = "") {
  return encodeURI(str).replace(/!/g, "");
}

export function stringifySearch(
  search: SearchState,
  compact = true,
): string | null {
  if (!search.feature) {
    return null;
  }
  try {
    const {
      readOnly,
      feature: {
        geometry: {
          coordinates: [lng, lat, z],
        },
        properties: { label, name, context, type },
      },
    } = search;
    return `${customRound(lng, 4)}!${customRound(lat, 4)}!${Math.round(z)}!${encode(type)}!${encode(label)}!${readOnly ? "1" : "0"}${compact ? "" : `!${encode(name)}!${encode(context || "")}`}`;
  } catch (e) {
    return null;
  }
}

export function parseSearchString(search: string | null): SearchHash {
  if (!search) {
    return {
      feature: null,
      readOnly: false,
    };
  }
  try {
    const [lng, lat, z, type, label, readOnly = false, name, context] =
      search.split("!");
    const fLng = parseFloat(lng);
    const fLat = parseFloat(lat);
    const fZ = parseFloat(z);
    if (isNaN(fLng) || isNaN(fLat) || isNaN(fZ) || !label) {
      throw new Error("unable to parse search String");
    }
    const feature: CustomGeoOption = {
      id: search,
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [fLng, fLat, fZ],
      },
      properties: {
        id: "custom",
        label: decodeURI(label),
        name: decodeURI(name),
        context: decodeURI(context),
        score: 1,
        type: decodeURI(type),
        originalProperties: null,
      },
    };
    return {
      feature,
      readOnly: !!readOnly,
    };
  } catch (err) {
    return {
      feature: null,
      readOnly: false,
    };
  }
}
