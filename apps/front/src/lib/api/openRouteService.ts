import { openRouteServiceToken, openRouteServiceUrl } from "~/config/constants";
import {
  DirectionOptions,
  DirectionPermissionOptions,
  GeoPointOption,
  OrsAPIPaths,
  OrsAPIRequests,
  OrsAPIResponse,
  RouteFeatureResponse,
  hashRoute,
} from "pentatrion-geo";
import { fetchAPI } from "pentatrion-design";
import { ORSProfile } from "pentatrion-geo/src/openrouteservice/api";
import { nanoid } from "@reduxjs/toolkit";

export function fetchOpenRouteServiceAPI<
  Path extends OrsAPIPaths,
  Options extends OrsAPIRequests<Path>,
>(path: Path, options?: Options): Promise<OrsAPIResponse<Path, Options["method"]>> {
  return fetchAPI(path, options, openRouteServiceUrl, {
    headers: {
      Authorization: openRouteServiceToken,
    },
  });
}

export async function orsRoute(
  wayPoints: GeoPointOption[],
  options: DirectionOptions,
  permissions: Partial<DirectionPermissionOptions>,
): Promise<RouteFeatureResponse | null> {
  let profile: ORSProfile = "driving-car";
  switch (options.profile) {
    case "car":
      profile = "driving-car";
      break;
    case "bike":
      profile = "cycling-regular";
      break;
    case "pedestrian":
      profile = "foot-hiking";
      break;
  }

  const avoidFeatures: ("highways" | "tollways")[] = [];
  !permissions.highways && avoidFeatures.push("highways");
  !permissions.tollways && avoidFeatures.push("tollways");

  const collection = await fetchOpenRouteServiceAPI("/v2/directions/{profile}/geojson", {
    urlParams: {
      profile,
    },
    method: "post",
    body: {
      id: nanoid(),
      coordinates: wayPoints.map((wayPoint) => wayPoint.geometry.coordinates),
      preference: options.optimization,
      units: "m",
      geometry: true,
      instructions: false,
      elevation: true,
      options: {
        avoid_features: avoidFeatures,
        avoid_borders: permissions.border ? "none" : "all",
      },
    },
  });

  if (collection.features.length < 1) {
    return null;
  }

  const feature = collection.features[0];

  const {
    bbox,
    geometry,
    properties: {
      ascent,
      descent,
      summary: { distance, duration },
    },
  } = feature;

  return {
    type: "Feature",
    properties: {
      wayPoints,
      profile: options.profile,
      optimization: options.optimization,
      timeUnit: "second",
      distanceUnit: "meter",
      distance,
      duration,
      ascent: ascent && Math.round(ascent),
      descent: descent && Math.round(descent),
      resource: "open-route-service",
      hash: hashRoute(wayPoints, options.optimization, options.profile, permissions),
    },
    geometry,
    bbox,
  };
}
