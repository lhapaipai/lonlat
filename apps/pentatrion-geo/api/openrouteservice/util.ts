import { Feature, LineString, Point } from "geojson";
import { distance } from "@turf/distance";
import { point } from "@turf/helpers";

export function computeDistance(geometry: LineString): LineString {
  let lastPoint: Feature<Point>;
  let totalDistance: number = 0;
  return {
    ...geometry,
    coordinates: geometry.coordinates.map(([lng, lat, z], idx) => {
      if (idx === 0) {
        lastPoint = point(geometry.coordinates[0]);
      }
      const nextPoint = point([lng, lat, z]);
      const segmentDistance = idx === 0 ? 0 : distance(lastPoint, nextPoint);

      totalDistance += segmentDistance;
      lastPoint = nextPoint;

      return [lng, lat, z, totalDistance];
    }),
  };
}
