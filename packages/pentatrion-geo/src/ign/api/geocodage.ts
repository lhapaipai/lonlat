import { fetchAPI } from "pentatrion-design";
import { getDepartmentName } from "../..";
import {
  APIPaths as GeocodageAPIPaths,
  APIRequests as GeocodageAPIRequests,
  APIResponse as GeocodageAPIResponse,
  APISchemas as GeocodageAPISchemas,
  AddressProperties,
  AddressReverseProperties,
} from "./geocodage-api";
import { dataGeoserviceUrl } from "../url";
import { Feature, Point, Position } from "geojson";
import { IGNAddressGeoOption, LngLatObj } from "../..";
import { nanoid } from "nanoid";

export function fetchIGNGeodageAPI<
  Path extends GeocodageAPIPaths,
  Options extends GeocodageAPIRequests<Path>,
>(path: Path, options?: Options): Promise<GeocodageAPIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, dataGeoserviceUrl);
}

export async function ignReverseSearch([lon, lat]: Position) {
  // return (await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({ type: "FeatureCollection", features: [] });
  //   }, 500);
  // })) as GeocodageAPISchemas["GeocodeAddressReverseResponse"];
  // throw new Error("Impossible de retrouver la localisation");

  const collection = await fetchIGNGeodageAPI("/geocodage/reverse", {
    query: {
      lon,
      lat,
      limit: 1,
    },
  });
  return collection as GeocodageAPISchemas["GeocodeAddressReverseResponse"];
}

export async function ignSearch(searchValue: string, coords: [number, number]) {
  // return (await fetch(`/data/ign-search.geojson`).then((res) =>
  //   res.json(),
  // )) as GeocodageAPISchemas["GeocodeAddressResponse"];
  // throw new Error("Impossible de faire une recherche ign");

  const collection = await fetchIGNGeodageAPI("/geocodage/search", {
    query: {
      q: searchValue,
      lon: coords[0],
      lat: coords[1],
    },
  });
  return collection as GeocodageAPISchemas["GeocodeAddressResponse"];
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
    | GeocodageAPISchemas["GeocodeAddressResponse"]
    | GeocodageAPISchemas["GeocodeAddressReverseResponse"],
): IGNAddressGeoOption[] {
  return collection.features.map((feature) => {
    return createIgnAddressFeaturePoint(feature);
  });
}
