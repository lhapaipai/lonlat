import { fetchAPI } from "pentatrion-design";
import { getDepartmentName } from "../feature-option/util";
import {
  APIPaths as GeocodageAPIPaths,
  APIRequests as GeocodageAPIRequests,
  APIResponse as GeocodageAPIResponse,
  APISchemas as GeocodageAPISchemas,
} from "./api-geocodage";
import { dataGeoserviceUrl } from "./urlHelper";
import { Feature, FeatureCollection, Point } from "geojson";
import { IGNAddressGeoOption, LngLatObj } from "..";
import { nanoid } from "nanoid";

export function fetchIGNGeodageAPI<
  Path extends GeocodageAPIPaths,
  Options extends GeocodageAPIRequests<Path>,
>(path: Path, options?: Options): Promise<GeocodageAPIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, dataGeoserviceUrl);
}

type AddressReverseProperties = GeocodageAPISchemas["AddressReverseProperties"];
type AddressReverseResponse = FeatureCollection<Point, AddressReverseProperties>;
export async function ignReverseSearch([lon, lat]: [number, number]) {
  // const collection = (await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({ type: "FeatureCollection", features: [] });
  //   }, 500);
  // })) as AddressReverseResponse;

  const collection = await fetchIGNGeodageAPI("/reverse", {
    query: {
      lon,
      lat,
      limit: 1,
    },
  });
  return collection as AddressReverseResponse;
}

type AddressSearchProperties = GeocodageAPISchemas["AddressProperties"];
type AddressSearchResponse = FeatureCollection<Point, AddressSearchProperties>;
export async function ignSearch(searchValue: string, coords: [number, number]) {
  // const collection = (await fetch(`/data/ign-search.geojson`).then((res) =>
  //   res.json(),
  // )) as AddressSearchResponse;

  const collection = await fetchIGNGeodageAPI("/search", {
    query: {
      q: searchValue,
      lon: coords[0],
      lat: coords[1],
    },
  });
  return collection as AddressSearchResponse;
}

export function getContext(properties: AddressSearchProperties | AddressReverseProperties) {
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

export function getLabel(properties: AddressSearchProperties | AddressReverseProperties) {
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
  {
    type,
    geometry,
    properties,
  }: Feature<Point, AddressSearchProperties | AddressReverseProperties>,
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
  collection: AddressSearchResponse | AddressReverseResponse,
): IGNAddressGeoOption[] {
  return collection.features.map((feature) => {
    return createIgnAddressFeaturePoint(feature);
  });
}
