import { Feature, Point } from "geojson";
import { nanoid } from "nanoid";
import {
  GeocodeType,
  IGNAddressGeoOption,
  IGNAddressProperties,
  IGNAddressResponse,
  LngLatObj,
} from "../types";
import { getContext, getLabel } from "../ign-api/geocode";

export function createIgnAddressFeaturePoint(
  { type, geometry, properties }: Feature<Point, IGNAddressProperties>,
  forceCoordinates?: LngLatObj,
): IGNAddressGeoOption {
  const uniqId = nanoid();
  return {
    id: uniqId,
    type,
    geometry: forceCoordinates
      ? {
          type: "Point",
          coordinates: [forceCoordinates.lng, forceCoordinates.lat],
        }
      : geometry,
    properties: {
      id: properties.id || uniqId,
      name: properties.name || "",
      context: getContext(properties),
      label: getLabel(properties),
      score: properties.score || 0,
      type: (properties.type || "unknown") as GeocodeType,
      originalProperties: properties,
    },
  };
}

export function parseIgnAddressCollection(
  collection: IGNAddressResponse,
): IGNAddressGeoOption[] {
  return collection.features.map((feature) => {
    return createIgnAddressFeaturePoint(feature);
  });
}
