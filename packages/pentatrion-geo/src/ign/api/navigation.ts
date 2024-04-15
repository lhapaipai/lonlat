import { fetchAPI } from "pentatrion-design";
import {
  IsochroneGeoJSON,
  APIPaths as NavigationAPIPaths,
  APIRequests as NavigationAPIRequests,
  APIResponse as NavigationAPIResponse,
  APISchemas as NavigationAPISchemas,
} from "./navigation-api";
import { dataGeoserviceUrl } from "../url";
import { Position } from "geojson";

export function fetchIGNNavigationAPI<
  Path extends NavigationAPIPaths,
  Options extends NavigationAPIRequests<Path>,
>(path: Path, options?: Options): Promise<NavigationAPIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, dataGeoserviceUrl);
}

export type IsochroneOptions = Omit<NavigationAPISchemas["IsochroneRequest"], "point" | "resource">;
export async function ignIsochrone(
  [lon, lat]: Position,
  options: IsochroneOptions,
): Promise<IsochroneGeoJSON> {
  const response = await fetchIGNNavigationAPI("/navigation/isochrone", {
    method: "post",
    body: {
      ...options,
      point: `${lon},${lat}`,
      resource: "bdtopo-valhalla",
      geometryFormat: "geojson",
    },
  });
  const { geometry, ...properties } = response;

  return {
    type: "Feature",
    properties,
    geometry,
  };
}
