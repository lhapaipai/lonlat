import { GeoPointOption } from "../types";
import { LineString, Feature } from "geojson";

export type RouteProperties = {
  wayPoints: GeoPointOption[];
  profile: DirectionProfile;
  optimization: DirectionOptimization;
  timeUnit?: "hour" | "minute" | "second";
  distanceUnit?: "meter" | "kilometer";
  distance: number;
  duration: number;
  resource: string;
  hash: string;
};

export type RouteFeatureResponse = Feature<LineString, RouteProperties>;

export type DirectionOptions = {
  profile: DirectionProfile;
  optimization: DirectionOptimization;
};

export type DirectionOptimization = "shortest" | "fastest";
export type DirectionProfile = "car" | "pedestrian";
export type DirectionPermission = "highway" | "bridge" | "tunnel";
export type DirectionPermissionOptions = {
  [key in DirectionPermission]: boolean;
};

export function hashRoute(
  features: GeoPointOption[],
  optimization: DirectionOptimization,
  profile: DirectionProfile,
  permissions: DirectionPermissionOptions,
) {
  const featuresStr = features
    .map((feature) => {
      const [lon, lat] = feature.geometry.coordinates;
      return `${lon}-${lat}`;
    })
    .join("|");
  const permissionsStr = Object.entries(permissions)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join("|");
  return `${featuresStr}-${optimization}-${profile}-${permissionsStr}`;
}
