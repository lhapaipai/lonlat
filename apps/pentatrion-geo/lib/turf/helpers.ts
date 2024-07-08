import {
  GeoJsonProperties,
  Position,
  BBox,
  LineString,
  Feature,
} from "geojson";
import { feature, type Id } from "@turf/helpers";

/**
 * Same as original with length >= 2 strict limitation
 */
export function lineString<P extends GeoJsonProperties = GeoJsonProperties>(
  coordinates: Position[],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {},
): Feature<LineString, P> {
  const geom: LineString = {
    type: "LineString",
    coordinates,
  };
  return feature(geom, properties, options);
}
