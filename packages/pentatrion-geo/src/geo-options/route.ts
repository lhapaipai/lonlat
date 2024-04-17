import { GeoPointOption } from "../types";
import { LineString, Feature } from "geojson";

export type RouteProperties = {
  wayPoints: GeoPointOption[];
  profile: "car" | "pedestrian" | "bike";
  optimization: "shortest" | "fastest" | "recommended";
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

export type IsochroneOptions = {
  costType: "time" | "distance";
  costValue: number;
  direction: "departure" | "arrival";
  profile: "car" | "pedestrian";
  constraints: {
    avoidHighways?: boolean;
    avoidBridges?: boolean;
    avoidTunnels?: boolean;
  };
};

export type DirectionOptions = {
  profile: RouteProperties["profile"];
  optimization: RouteProperties["optimization"];
  constraints: {
    avoidHighways?: boolean;
    avoidTollways?: boolean;
    avoidBridges?: boolean;
    avoidTunnels?: boolean;
    avoidBorders?: boolean;
  };
};

export function hashRoute(features: GeoPointOption[], options: DirectionOptions) {
  const { optimization, profile, constraints } = options;
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
