import { LngLat } from "maplibre-gl";
import { nanoid } from "nanoid";
import { AppGeoOption, LonLatGeoOption } from "../types";
import { createIgnAddressFeaturePoint, ignReverseSearch } from "../ign/geocode";

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

export function updateGeoOptionScore<T extends AppGeoOption>(feature: T, score: number): T {
  return {
    ...feature,
    properties: {
      ...feature.properties,
      score,
    },
  };
}

export const resolveLonLatFeaturePoint = async (feature: AppGeoOption) => {
  // feature don't need to be resolved
  if (feature.properties.type !== "lonlat" || feature.properties.score !== 0) {
    return feature;
  }
  if (feature.geometry.type !== "Point") {
    throw new Error("only Point geometry can be reverse geocoded");
  }

  const collection = await ignReverseSearch(feature.geometry.coordinates);

  if (collection.features.length === 0) {
    // we update the score to 1 we don't try anymore to reverse geocode
    // prevent circular reference
    return updateGeoOptionScore(feature, 1);
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
    return updateGeoOptionScore(feature, 1);
  }

  // we keep the original coordinates with the resolved address.
  const [lng, lat] = feature.geometry.coordinates;
  return createIgnAddressFeaturePoint(reversedFeature, { lng, lat });
};
