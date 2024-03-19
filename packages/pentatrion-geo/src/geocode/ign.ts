import { Feature, FeatureCollection, Point } from "geojson";
import { nanoid } from "nanoid";
import { APISchemas } from "./ign-geocodage-api";
import { getDepartmentName } from "./util";
import { GeoFeature, GeoFeatureOption, GeocodeType } from "..";

type IGNAddressProperties = APISchemas["AddressProperties"];
export type IGNAddressResponse = FeatureCollection<Point, APISchemas["AddressProperties"]>;

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

export function prepareGeoFeature({
  type,
  geometry,
  properties,
}: Feature<Point, APISchemas["AddressProperties"]>): GeoFeature {
  return {
    // uniq id
    id: nanoid(),
    type,
    geometry,
    properties: {
      id: properties.id || Math.floor(Math.random() * 1000000).toString(),
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
    const geoFeature = prepareGeoFeature(feature);
    return {
      // better to use uniqId.
      value: geoFeature.id?.toString() || nanoid(),
      label: geoFeature.properties.label,
      feature: geoFeature,
      sourceId,
    };
  });
}
