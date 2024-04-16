import { fetchAPI } from "pentatrion-design";
import {
  IsochroneGeoJSON,
  APIPaths as NavigationAPIPaths,
  APIRequests as NavigationAPIRequests,
  APIResponse as NavigationAPIResponse,
  APISchemas as NavigationAPISchemas,
} from "./navigation-api";
import { dataGeoserviceUrl } from "../url";
import { LineString, Position } from "geojson";
import {
  DirectionOptions,
  DirectionPermissionOptions,
  RouteFeatureResponse,
  hashRoute,
  GeoPointOption,
} from "../..";

export function fetchIGNNavigationAPI<
  Path extends NavigationAPIPaths,
  Options extends NavigationAPIRequests<Path>,
>(path: Path, options?: Options): Promise<NavigationAPIResponse<Path, Options["method"]>> {
  console.log("fetchAPI", path, options);
  return fetchAPI(path, options, dataGeoserviceUrl);
}

export type IsochroneOptions = Omit<NavigationAPISchemas["IsochroneRequest"], "point" | "resource">;
export async function ignIsochrone(
  position: Position,
  options: IsochroneOptions,
): Promise<IsochroneGeoJSON> {
  const response = await fetchIGNNavigationAPI("/navigation/isochrone", {
    method: "post",
    body: {
      ...options,
      point: stringifyPosition(position),
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

function stringifyPosition(position: Position) {
  return `${position[0]},${position[1]}`;
}

export async function ignItineraire(
  locations: GeoPointOption[],
  options: DirectionOptions,
  permissions: DirectionPermissionOptions,
): Promise<RouteFeatureResponse> {
  const positions = locations.map((location) => location.geometry.coordinates);

  const intermediates = positions.slice();
  const start = intermediates.splice(0, 1)[0];
  const end = intermediates.splice(-1, 1)[0];

  const constraints: ("autoroute" | "tunnel" | "pont")[] = [];
  !permissions.highway && constraints.push("autoroute");
  !permissions.bridge && constraints.push("pont");
  !permissions.tunnel && constraints.push("tunnel");

  const response = await fetchIGNNavigationAPI("/navigation/itineraire", {
    method: "post",
    body: {
      ...options,
      ...(intermediates.length > 0 ? { intermediates: intermediates.map(stringifyPosition) } : {}),
      ...(constraints.length > 0
        ? {
            constraints: constraints.map((value) => ({
              key: "waytype",
              constraintType: "banned",
              operator: "=",
              value,
            })),
          }
        : {}),
      resource: "bdtopo-osrm",
      start: stringifyPosition(start),
      end: stringifyPosition(end),
      getSteps: "false",
      geometryFormat: "geojson",
      timeUnit: "minute",
      distanceUnit: "meter",
      getBbox: "true",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    geometry,
    profile,
    optimization,
    timeUnit,
    distanceUnit,
    distance,
    duration,
    resource,
    bbox,
  } = response;

  return {
    type: "Feature",
    properties: {
      wayPoints: locations,
      profile,
      optimization,
      timeUnit,
      distanceUnit,
      distance,
      duration,
      resource,
      hash: hashRoute(locations, optimization, profile, permissions),
    },
    geometry: geometry as LineString,
    bbox,
  };
}
