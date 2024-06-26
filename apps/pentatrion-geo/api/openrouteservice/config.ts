import {
  APIPaths as OrsAPIPaths,
  APIRequests as OrsAPIRequests,
  APIResponse as OrsAPIResponse,
} from "./api";
import { fetchAPI } from "pentatrion-design/lib";

// export const openRouteServiceUrl = "http://localhost:8080/ors";
export const openRouteServiceUrl = "https://api.openrouteservice.org";

export function fetchOpenRouteServiceAPI<
  Path extends OrsAPIPaths,
  Options extends OrsAPIRequests<Path>,
>(
  path: Path,
  options?: Options,
  token?: string,
  serviceUrl = openRouteServiceUrl,
): Promise<OrsAPIResponse<Path, Options["method"]>> {
  return fetchAPI(
    path,
    options,
    serviceUrl,
    token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : undefined,
  );
}
