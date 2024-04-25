import { DirectionOptions, GeoPointOption, RouteFeatureResponse, hashRoute } from "~geo";
import { ORSProfile } from "./api";
import { fetchOpenRouteServiceAPI, openRouteServiceUrl } from "./config";
import { nanoid } from "nanoid";

export async function orsRoute(
  wayPoints: GeoPointOption[],
  options: DirectionOptions,
  token?: string,
  serviceUrl = openRouteServiceUrl,
): Promise<RouteFeatureResponse | null> {
  const { profile, optimization, constraints } = options;

  let orsProfile: ORSProfile = "driving-car";
  switch (profile) {
    case "car":
      orsProfile = "driving-car";
      break;
    case "bike":
      orsProfile = "cycling-regular";
      break;
    case "pedestrian":
      orsProfile = "foot-hiking";
      break;
  }

  const avoidFeatures: ("highways" | "tollways")[] = [];
  if (profile === "car") {
    constraints.avoidHighways && avoidFeatures.push("highways");
    constraints.avoidTollways && avoidFeatures.push("tollways");
  }

  const collection = await fetchOpenRouteServiceAPI(
    "/v2/directions/{profile}/geojson",
    {
      urlParams: {
        profile: orsProfile,
      },
      method: "post",
      body: {
        id: nanoid(),
        coordinates: wayPoints.map((wayPoint) => wayPoint.geometry.coordinates.slice(0, 2)),
        preference: optimization,
        units: "m",
        geometry: true,
        instructions: false,
        elevation: true,
        options: {
          avoid_features: avoidFeatures,
          avoid_borders: constraints.avoidBorders ? "none" : "all",
        },
      },
    },
    token,
    serviceUrl,
  );

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
      profile,
      optimization: options.optimization,
      timeUnit: "second",
      distanceUnit: "meter",
      distance,
      duration,
      ascent: ascent && Math.round(ascent),
      descent: descent && Math.round(descent),
      resource: "open-route-service",
      hash: hashRoute(wayPoints, options),
    },
    geometry,
    bbox,
  };
}
