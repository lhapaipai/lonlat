import { CustomGeoOption, GeoPointOption } from "pentatrion-geo";
import { customRound } from "pentatrion-geo/geo-options/util";
import { encode } from "./util";
import { Position } from "geojson";

function stringifyCoordinates([lng, lat, z]: Position) {
  return `${customRound(lng, 4)}_${customRound(lat, 4)}${z ? `_${Math.round(z)}` : ""}`;
}

function parseCoordinates(
  coordsStr: string,
): [number, number] | [number, number, number] {
  const coords = coordsStr.split("_");
  if (coords.length < 2) {
    throw new Error("unable to parse search String");
  }
  const fLng = parseFloat(coords[0]);
  const fLat = parseFloat(coords[1]);

  if (coords.length === 2) {
    if (isNaN(fLng) || isNaN(fLat)) {
      throw new Error("unable to parse search String");
    }
    return [fLng, fLat];
  }

  const fZ = parseFloat(coords[2]);

  if (isNaN(fZ)) {
    throw new Error("unable to parse search String");
  }
  return [fLng, fLat, fZ];
}

export function stringifyGeoPoint(
  feature: GeoPointOption,
  compact = true,
): string | null {
  if (!feature) {
    return null;
  }
  try {
    const {
      geometry: { coordinates },
      properties: { label, name, context, type },
    } = feature;

    return `${stringifyCoordinates(coordinates)}!${encode(type)}!${encode(label)}${compact ? "" : `!${encode(name)}!${encode(context || "")}`}`;
  } catch (e) {
    return null;
  }
}

export function parseGeoPoint(
  featureStr: string | null,
): GeoPointOption | null {
  if (!featureStr) {
    return null;
  }
  try {
    const [coordinates, type, label, name, context] = featureStr.split("!");
    if (!label) {
      throw new Error("unable to parse search String");
    }
    const feature: CustomGeoOption = {
      id: featureStr,
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: parseCoordinates(coordinates),
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
    return feature;
  } catch (err) {
    return null;
  }
}
