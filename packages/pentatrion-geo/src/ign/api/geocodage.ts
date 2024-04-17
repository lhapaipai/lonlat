import { fetchAPI } from "pentatrion-design";
import { getDepartmentName } from "../..";
import { APIPaths, APIRequests, APIResponse, APISchemas } from "./geocodage-api";
import { dataGeoserviceUrl } from "../url";
import { Feature, FeatureCollection, Point, Position } from "geojson";
import { IGNAddressGeoOption, LngLatObj } from "../..";
import { nanoid } from "nanoid";

type AddressProperties = APISchemas["AddressProperties"];
type AddressReverseProperties = APISchemas["AddressReverseProperties"];

export function fetchIGNGeodageAPI<Path extends APIPaths, Options extends APIRequests<Path>>(
  path: Path,
  options?: Options,
): Promise<APIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, dataGeoserviceUrl);
}

export async function ignReverseSearch([lon, lat]: Position) {
  const collection = await fetchIGNGeodageAPI("/geocodage/reverse?index=address", {
    query: {
      lon,
      lat,
      limit: 1,
    },
  });

  if (collection.features.length === 0) {
    return null;
  }

  const reversedFeature = collection.features[0];

  // the best result returns an address more than 50m away we will judge
  // that it does not match
  if (
    reversedFeature.properties.distance === undefined ||
    reversedFeature.properties.distance > 100
  ) {
    return null;
  }

  return createIgnAddressFeaturePoint(reversedFeature);
}

export async function ignSearch(searchValue: string, coords: [number, number]) {
  const collection = await fetchIGNGeodageAPI("/geocodage/search?index=address", {
    query: {
      q: searchValue,
      lon: coords[0],
      lat: coords[1],
    },
  });
  return parseIgnAddressCollection(collection);
}

export function getContext(properties: AddressProperties | AddressReverseProperties) {
  switch (properties.type) {
    case "housenumber":
    case "street":
    case "locality":
      return `${properties.city}, ${getDepartmentName(properties.citycode)}`;
    case "municipality":
      return getDepartmentName(properties.citycode) || "";
  }
  return properties.context;
}

export function getLabel(properties: AddressProperties | AddressReverseProperties) {
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

export function createIgnAddressFeaturePoint(
  { type, geometry, properties }: Feature<Point, AddressProperties | AddressReverseProperties>,
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
      type: properties.type || "unknown",
      originalProperties: properties,
    },
  };
}

export function parseIgnAddressCollection(
  collection:
    | FeatureCollection<Point, AddressProperties>
    | FeatureCollection<Point, AddressReverseProperties>,
): IGNAddressGeoOption[] {
  return collection.features.map((feature) => {
    return createIgnAddressFeaturePoint(feature);
  });
}
