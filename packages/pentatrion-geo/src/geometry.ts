import { LngLatBounds, LngLatLike } from "maplibre-gl";

export function getBounds(points: LngLatLike[]) {
  const bounds = points.reduce(
    (bounds, point) => {
      return bounds.extend(point);
    },
    new LngLatBounds(points[0], points[0]),
  );

  return bounds;
}

export function boundsContained(parentBound: LngLatBounds, childBound: LngLatBounds) {
  return (
    parentBound.contains(childBound.getNorthWest()) &&
    parentBound.contains(childBound.getSouthEast())
  );
}
