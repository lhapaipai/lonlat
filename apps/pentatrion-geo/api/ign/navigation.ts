import { fetchAPI } from "pentatrion-design/lib";
import {
  IsochroneGeoJSON,
  APIPaths,
  APIRequests,
  APIResponse,
} from "./navigation-api";
import {
  DirectionOptions,
  RouteFeatureResponse,
  GeoPointOption,
  IsochroneOptions,
} from "../../types.d";
import { LineString, Position } from "geojson";
import { dataGeoserviceUrl } from "./url";
import { hashRoute } from "../../geo-options";

export function fetchIGNNavigationAPI<
  Path extends APIPaths,
  Options extends APIRequests<Path>,
>(
  path: Path,
  options?: Options,
): Promise<APIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, dataGeoserviceUrl);
}

export async function ignIsochrone(
  position: Position,
  { costType, costValue, direction, profile, constraints }: IsochroneOptions,
): Promise<IsochroneGeoJSON> {
  const bannedFeatures: ("autoroute" | "tunnel" | "pont")[] = [];
  constraints.avoidHighways && bannedFeatures.push("autoroute");
  constraints.avoidBridges && bannedFeatures.push("pont");
  constraints.avoidTunnels && bannedFeatures.push("tunnel");

  const response = await fetchIGNNavigationAPI("/navigation/isochrone", {
    method: "post",
    body: {
      costType,
      costValue: (costType === "distance"
        ? costValue
        : costValue * 60
      ).toString(),
      profile,
      direction,
      distanceUnit: "meter",
      timeUnit: "second",
      point: stringifyPosition(position),
      resource: "bdtopo-valhalla",
      geometryFormat: "geojson",
      ...(bannedFeatures.length > 0
        ? {
            constraints: bannedFeatures.map((value) => ({
              key: "waytype",
              constraintType: "banned",
              operator: "=",
              value,
            })),
          }
        : {}),
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
): Promise<RouteFeatureResponse> {
  const { profile, optimization, constraints } = options;

  const positions = locations.map((location) => location.geometry.coordinates);

  const intermediates = positions.slice();
  const start = intermediates.splice(0, 1)[0];
  const end = intermediates.splice(-1, 1)[0];

  const bannedFeatures: ("autoroute" | "tunnel" | "pont")[] = [];
  constraints.avoidHighways && bannedFeatures.push("autoroute");
  constraints.avoidBridges && bannedFeatures.push("pont");
  constraints.avoidTunnels && bannedFeatures.push("tunnel");

  if (profile === "bike") {
    throw Error("bike profile Not compatible with ignItineraire");
  }
  if (optimization === "recommended") {
    throw Error("recommended optimization Not compatible with ignItineraire");
  }

  const response = await fetchIGNNavigationAPI("/navigation/itineraire", {
    method: "post",
    body: {
      profile,
      optimization,
      ...(intermediates.length > 0
        ? { intermediates: intermediates.map(stringifyPosition) }
        : {}),
      ...(bannedFeatures.length > 0
        ? {
            constraints: bannedFeatures.map((value) => ({
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

  const {
    geometry,
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
      hash: hashRoute(locations, options),
    },
    geometry: geometry as LineString,
    bbox,
  };
}
