import { Feature, Point } from "geojson";
import { nanoid } from "nanoid";
import { getDepartmentName } from "./util";
import {
  GeoFeature,
  GeoFeatureOption,
  GeocodeType,
  IGNAddressProperties,
  IGNAddressResponse,
} from "../types";

function getContext(properties: IGNAddressProperties) {
  switch (properties.type) {
    case "housenumber":
    case "street":
    case "locality":
      return `${properties.city}, ${getDepartmentName(properties.citycode)}`;
    case "municipality":
      return getDepartmentName(properties.citycode);
  }
  return properties.context || null;
}

function getLabel(properties: IGNAddressProperties) {
  switch (properties.type) {
    case "housenumber":
    case "street":
      return `${properties.name}, ${properties.city}`;
    case "locality":
      if (properties.name !== properties.city) {
        return `${properties.name}, ${properties.city}`;
      }
      return `${properties.city}, ${getDepartmentName(properties.citycode)}`;
    case "municipality":
      return `${properties.name}, ${getDepartmentName(properties.citycode)}`;
  }
  return `${properties.name}, ${getDepartmentName(properties.citycode)}`;
}

export function createIgnAddressFeaturePoint({
  type,
  geometry,
  properties,
}: Feature<Point, IGNAddressProperties>): GeoFeature {
  const uniqId = nanoid();
  return {
    id: uniqId,
    type,
    geometry,
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

export function prepareResult(
  collection: IGNAddressResponse,
  sourceId?: string | number,
): GeoFeatureOption[] {
  return collection.features.map((feature) => {
    const geoFeature = createIgnAddressFeaturePoint(feature);
    return {
      // better to use uniqId.
      value: geoFeature.id?.toString() || nanoid(),
      label: geoFeature.properties.label,
      feature: geoFeature,
      sourceId,
    };
  });
}
