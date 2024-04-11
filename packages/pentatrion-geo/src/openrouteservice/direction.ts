import { GeoPointOption } from "..";

import {
  APIPaths as OrsAPIPaths,
  APIRequests as OrsAPIRequests,
  APIResponse as OrsAPIResponse,
  RouteFeatureResponse,
} from "./api-ors";
import { fetchAPI } from "pentatrion-design";
import { openRouteServiceUrl } from "./config";

export function fetchOpenRouteServiceAPI<
  Path extends OrsAPIPaths,
  Options extends OrsAPIRequests<Path>,
>(path: Path, options?: Options): Promise<OrsAPIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, openRouteServiceUrl);
}

export async function getRoute(features: GeoPointOption[]): Promise<RouteFeatureResponse | null> {
  const collection = await fetchOpenRouteServiceAPI("/ors/v2/directions/{profile}/geojson", {
    urlParams: {
      profile: "driving-car",
    },
    method: "post",
    body: {
      coordinates: features.map((feature) => feature.geometry.coordinates),
    },
  });

  if (collection.features.length < 1) {
    return null;
  }

  const feature = collection.features[0];
  return {
    ...feature,
    properties: {
      ...feature.properties,
      coords_hash: hashCoords(features),
    },
  };
}

export function hashCoords(features: GeoPointOption[]) {
  return features
    .map((feature) => {
      const [lon, lat] = feature.geometry.coordinates;
      return `${lon}-${lat}`;
    })
    .join("|");
}
