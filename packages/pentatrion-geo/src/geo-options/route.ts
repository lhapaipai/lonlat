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
  ascent?: number;
  descent?: number;
  resource: string;
  hash: string;
};

export type RouteFeatureResponse = Feature<LineString, RouteProperties>;

export type DirectionOptions = {
  profile: DirectionProfile;
  optimization: DirectionOptimization;
};

export type DirectionOptimization = "shortest" | "fastest" | "recommended";
export type DirectionProfile = "car" | "pedestrian" | "bike";
export type DirectionPermission = "highways" | "tollways" | "bridge" | "tunnel" | "border";
export type DirectionPermissionOptions = {
  [key in DirectionPermission]: boolean;
};

export function hashRoute(
  features: GeoPointOption[],
  optimization: DirectionOptimization,
  profile: DirectionProfile,
  permissions: Partial<DirectionPermissionOptions>,
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
