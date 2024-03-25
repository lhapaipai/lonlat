import { LngLat } from "maplibre-gl";
import { nanoid } from "nanoid";
import { GeoFeature } from "../types";

export function createLonLatFeaturePoint(lngLat: LngLat, id?: string): GeoFeature {
  const { lng, lat } = lngLat;
  const lngRounded = Math.round(lng * 10000) / 10000;
  const latRounded = Math.round(lat * 10000) / 10000;

  return {
    id: id ?? nanoid(),
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
    properties: {
      id: `${lng}-${lat}`,
      name: `longitude: ${lngRounded}, latitude: ${latRounded}`,
      context: null,
      label: `longitude: ${lngRounded}, latitude: ${latRounded}`,
      score: 1,
      type: "lonlat",
      originalProperties: null,
    },
  };
}
