import { LngLat } from "maplibre-gl";
import { nanoid } from "nanoid";
import { GeoFeature, LonLatFeatureOption } from "../types";
import { createIgnAddressFeaturePoint } from "./ign";
import { ignReverseSearch } from "../ign-api/geocode";

export function createLonLatFeaturePoint(
  lngLat: LngLat,
  // if score is 0 we try to reverse geocode
  // if score is 1 we don't try to convert this feature into another feature
  score: number = 1,
  id?: string,
): LonLatFeatureOption {
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
      score: score,
      type: "lonlat",
      originalProperties: null,
    },
  };
}

export function updateLonLatFeatureScore(feature: GeoFeature, score: number) {
  return {
    ...feature,
    properties: {
      ...feature.properties,
      score,
    },
  };
}

export const resolveLonLatFeaturePoint = async (feature: GeoFeature) => {
  if (feature.properties.type !== "lonlat") {
    return feature;
  }
  if (feature.geometry.type !== "Point") {
    throw new Error("only Point geometry can be reverse geocoded");
  }

  // feature don't need to be resolved
  if (feature.properties.score !== 0) {
    return feature;
  }

  const collection = await ignReverseSearch(feature.geometry.coordinates);

  if (collection.features.length === 0) {
    // we update the score to 1 we don't try anymore to reverse geocode
    // prevent circular reference
    return updateLonLatFeatureScore(feature, 1);
  }

  const reversedFeature = collection.features[0];

  // the best result returns an address more than 50m away we will judge
  // that it does not match
  if (
    reversedFeature.properties.distance === undefined ||
    reversedFeature.properties.distance > 50
  ) {
    // we update the score to 1 we don't try anymore to reverse geocode
    // prevent circular reference
    return updateLonLatFeatureScore(feature, 1);
  }

  const [lng, lat] = feature.geometry.coordinates;
  return createIgnAddressFeaturePoint(reversedFeature, { lng, lat });
};
