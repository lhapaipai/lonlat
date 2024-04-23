import { nanoid } from "nanoid";
import { GeoPointOption, GeolocationGeoOption } from "../types";

export function isGeolocationGeoOption(option: GeoPointOption): option is GeolocationGeoOption {
  return option.properties.type === "geolocation";
}

export function createGeolocationGeoOption(label = "My position"): GeolocationGeoOption {
  return {
    id: nanoid(),
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [NaN, NaN],
    },
    properties: {
      id: "geolocation",
      label: label,
      name: label,
      context: null,
      score: 1,
      type: "geolocation",
      originalProperties: null,
    },
  };
}
