import { LngLat } from "maplibre-gl";
import { nanoid } from "nanoid";
import { ignReverseSearch, ignElevationPoint } from "../api/ign";
import { FeatureProperties, GeoPointOption, LonLatGeoOption } from "../types";

import { Point } from "geojson";

export function createLonLatFeaturePoint(
  lngLat: LngLat,
  // if score is 0 we try to reverse geocode
  // if score is 1 we don't try to convert this feature into another feature
  score: number = 1,
  id?: string,
): LonLatGeoOption {
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
      type: "lonlat",
      name: `longitude: ${lngRounded}, latitude: ${latRounded}`,
      context: null,
      label: `longitude: ${lngRounded}, latitude: ${latRounded}`,
      score: score,
      originalProperties: null,
    },
  };
}

export function updateFeaturePropertiesScore<T extends FeatureProperties>(
  properties: T,
  score: number,
): T {
  return {
    ...properties,
    score,
  };
}

export const reverseGeocodeLonLatFeaturePoint = async (
  feature: GeoPointOption,
): Promise<FeatureProperties | null> => {
  // feature don't need to be resolved
  if (feature.properties.type !== "lonlat" || feature.properties.score !== 0) {
    return null;
  }
  if (feature.geometry.type !== "Point") {
    throw new Error("only Point geometry can be reverse geocoded");
  }

  const reversedGeoOption = await ignReverseSearch(feature.geometry.coordinates);

  if (reversedGeoOption === null) {
    // we update the score to 1 we don't try anymore to reverse geocode
    // prevent circular reference
    return updateFeaturePropertiesScore(feature.properties, 1);
  }

  return reversedGeoOption.properties;
};

export const getFeaturePointAltitude = async (feature: GeoPointOption): Promise<Point | null> => {
  if (feature.geometry.type !== "Point" || feature.geometry.coordinates[2] !== undefined) {
    return null;
  }

  const coordinates = await ignElevationPoint(feature.geometry.coordinates);

  return {
    type: "Point",
    coordinates,
  };
};
