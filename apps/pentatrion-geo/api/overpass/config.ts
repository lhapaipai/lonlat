import { fetchAPI } from "./fetch";
import {
  APIPaths as OverpassAPIPaths,
  APIRequests as OverpassAPIRequests,
  APIResponse as OverpassAPIResponse,
} from "./api";

export const generateBody = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const overpassServiceUrl = "https://z.overpass-api.de";

export function fetchOverpassAPI<
  Path extends OverpassAPIPaths,
  Options extends OverpassAPIRequests<Path>,
>(
  path: Path,
  options?: Options,
  serviceUrl = overpassServiceUrl,
): Promise<OverpassAPIResponse<Path, Options["method"]>> {
  return fetchAPI(
    path,
    {
      ...options,
      headers: {
        "Content-Type": "x-www-form-urlencoded",
      },
      body: generateBody(options?.body ?? {}),
    },
    serviceUrl,
  );
}
