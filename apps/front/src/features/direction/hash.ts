import { DirectionOptions } from "pentatrion-geo/types";
import { createNodataFeature, isNoData } from "pentatrion-geo/geo-options";
import { DirectionState } from "~/features/direction/directionSlice";
import { encodeBool, parseGeoPoint, stringifyGeoPoint } from "~/lib/hashUtil";

export function stringifyDirection(direction: DirectionState): string | null {
  try {
    const {
      showElevationProfile,
      wayPoints,
      constraints: { avoidBorders, avoidHighways, avoidTollways },
      optimization,
      profile,
    } = direction;

    if (wayPoints.every(isNoData)) {
      return null;
    }

    const wayPointsStr = wayPoints
      .map((w) => {
        return w.type === "nodata" ? "nodata" : stringifyGeoPoint(w);
      })
      .join("^");

    return `${profile}|${optimization}|${encodeBool(avoidHighways)}|${encodeBool(avoidTollways)}|${encodeBool(avoidBorders)}|${encodeBool(showElevationProfile)}|${wayPointsStr}`;
  } catch (e) {
    return null;
  }
}

export function parseDirection(
  directionStr: string | null,
): DirectionState | null {
  if (!directionStr) {
    return null;
  }
  try {
    const [
      profile,
      optimization,
      avoidHighways,
      avoidTollways,
      avoidBorders,
      showElevationProfile,
      waypointsStr,
    ] = directionStr.split("|");

    const waypoints = waypointsStr.split("^").map((f, idx) => {
      if (f === "nodata") {
        return createNodataFeature(idx.toString());
      }
      return parseGeoPoint(f) ?? createNodataFeature(idx.toString());
    });

    return {
      showElevationProfile: showElevationProfile === "1",
      pois: null,
      focusCoordinates: null,
      wayPoints: waypoints,
      route: null,
      constraints: {
        avoidHighways: avoidHighways === "1",
        avoidTollways: avoidTollways === "1",
        avoidBorders: avoidBorders === "1",
      },
      optimization: (["shortest", "fastest", "recommended"].includes(
        optimization,
      )
        ? optimization
        : "recommended") as DirectionOptions["optimization"],
      profile: (["car", "pedestrian", "bike"].includes(profile)
        ? profile
        : "car") as DirectionOptions["profile"],
    };
  } catch (err) {
    return null;
  }
}
