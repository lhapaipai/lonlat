import { LngLatBounds, LngLatLike } from "maplibre-gl";
import { FeatureOption } from "./types";
import Fuse from "fuse.js";
import { NoDataFeature } from "pentatrion-design";

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

export function filterFeature(towns: FeatureOption[], search: string) {
  const fuse = new Fuse(towns, {
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    keys: ["properties.label"],
  });

  const results = fuse.search(search);
  return results.map((result) => result.item);
}

export function filterDataFeatures(features: (FeatureOption | NoDataFeature)[]) {
  return features.filter((f) => f.type !== "nodata") as FeatureOption[];
}
