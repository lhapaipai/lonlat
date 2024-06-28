import { fetchAPI } from "pentatrion-design/lib/fetch";
import {
  APIPaths as ElevationAPIPaths,
  APIRequests as ElevationAPIRequests,
  APIResponse as ElevationAPIResponse,
  APISchemas as ElevationAPISchemas,
} from "./altimetrie-api";

import { Position } from "geojson";
import { dataGeoserviceUrl } from "./url";

export const noDataElevationValue = -99999;

export function fetchIGNElevationAPI<
  Path extends ElevationAPIPaths,
  Options extends ElevationAPIRequests<Path>,
>(
  path: Path,
  options?: Options,
): Promise<ElevationAPIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, dataGeoserviceUrl);
}

export async function ignElevationPoint([lon, lat]: Position): Promise<
  [number, number, number]
> {
  const collection = (await fetchIGNElevationAPI(
    "/altimetrie/1.0/calcul/alti/rest/elevation.{format}",
    {
      method: "post",
      urlParams: {
        format: "json",
      },
      body: {
        lon: lon.toString(),
        lat: lat.toString(),
        zonly: "true",
        resource: "ign_rge_alti_wld",
      },
    },
  )) as ElevationAPISchemas["ElevationResponseZonly"];

  if (
    collection.elevations.length === 0 ||
    collection.elevations[0] <= -99999
  ) {
    return [lon, lat, noDataElevationValue];
  }

  return [lon, lat, Math.round(collection.elevations[0])];
}
