import { LngLat, LngLatBounds } from "maplibre-gl";
import { GeoOption, GeoPointOption } from "~geo";
import Fuse from "fuse.js";
import { NoDataOption } from "pentatrion-design";
import { Position } from "geojson";

export function getBounds([firstPoint, ...rest]: Position[]) {
  const lngLat = LngLat.convert([firstPoint[0], firstPoint[1]]);
  const bounds = rest.reduce(
    (bounds, point) => {
      return bounds.extend([point[0], point[1]]);
    },
    new LngLatBounds(lngLat, lngLat),
  );

  return bounds;
}

export function boundsContained(parentBound: LngLatBounds, childBound: LngLatBounds) {
  return (
    parentBound.contains(childBound.getNorthWest()) &&
    parentBound.contains(childBound.getSouthEast())
  );
}

export function filterFeature(towns: GeoPointOption[], search: string) {
  const fuse = new Fuse(towns, {
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    keys: ["properties.label"],
  });

  const results = fuse.search(search);
  return results.map((result) => result.item);
}

export function filterDataFeatures<O extends GeoOption = GeoOption>(
  features: (O | NoDataOption)[],
) {
  return features.filter((f) => f.type !== "nodata") as O[];
}
