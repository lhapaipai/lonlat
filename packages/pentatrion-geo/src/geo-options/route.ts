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

// export type IsochroneProfile = "car" | "pedestrian";
// export type IsochroneConstraint = "avoidHighways" | "avoidBridges" | "avoidTunnels";
// export type IsochroneConstraintOptions = {
//   [key in IsochroneConstraint]: boolean;
// };

// export type IsochroneOptions = {
//   costType: "time" | "distance";
//   costValue: number;
//   direction: "departure" | "arrival";
//   profile: IsochroneProfile;
//   constraints: IsochroneConstraintOptions;
// };

export type IsochroneOptions = {
  costType: "time" | "distance";
  costValue: number;
  direction: "departure" | "arrival";
  profile: "car" | "pedestrian";
  constraints: {
    avoidHighways: boolean;
    avoidBridges: boolean;
    avoidTunnels: boolean;
  };
};

export type DirectionOptions = {
  profile: "car" | "pedestrian" | "bike";
  optimization: "shortest" | "fastest" | "recommended";
  constraints: {
    avoidHighways: boolean;
    avoidTollways: boolean;
    avoidBridges: boolean;
    avoidTunnels: boolean;
    avoidBorders: boolean;
  };
};

// export type DirectionOptions = {
//   profile: DirectionProfile;
//   optimization: DirectionOptimization;
//   constraints: DirectionConstraintOptions;
// };

// export type DirectionOptimization = "shortest" | "fastest" | "recommended";
// export type DirectionProfile = "car" | "pedestrian" | "bike";
// export type DirectionConstraint =
//   | "avoidHighways"
//   | "avoidTollways"
//   | "avoidBridges"
//   | "avoidTunnels"
//   | "avoidBorders";
// export type DirectionConstraintOptions = {
//   [key in DirectionConstraint]: boolean;
// };

export function hashRoute(
  features: GeoPointOption[],
  optimization: DirectionOptions["optimization"],
  profile: DirectionOptions["profile"],
  constraints: Partial<DirectionOptions["constraints"]>,
) {
  const featuresStr = features
    .map((feature) => {
      const [lon, lat] = feature.geometry.coordinates;
      return `${lon}-${lat}`;
    })
    .join("|");
  const constraintsStr = Object.entries(constraints)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join("|");
  return `${featuresStr}-${optimization}-${profile}-${constraintsStr}`;
}
