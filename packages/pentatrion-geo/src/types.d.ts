import { BBox, FeatureCollection, Geometry } from "geojson";
import { IGNAddressProperties } from "..";
import { APISchemas } from "./openapi-types/ign-geocodage-api";
import { FeatureOption } from "pentatrion-design";

export type GeocodeType =
  | "housenumber"
  | "street"
  | "locality"
  | "municipality"
  | "lonlat"
  | "unknown"
  | "nodata";

// Raw data
export type IGNAddressProperties = APISchemas["AddressProperties"];
export type IGNAddressResponse = FeatureCollection<Point, APISchemas["AddressProperties"]>;

// Prepared data
export type IGNAddressFeatureOption = FeatureOption<Point, IGNAddressProperties>;
export type LonLatFeatureOption = FeatureOption<Point, null>;

// IGNAddressProperties | null
export type GeoFeature = IGNAddressFeatureOption | LonLatFeatureOption;

export type FeatureOption<G extends Geometry | null = Geometry, OriginalProperties = any> = {
  id: string;
  type: "Feature";
  properties: FeatureProperties<OriginalProperties>;
  sourceId?: string | number;

  geometry: G;
  bbox?: BBox | undefined;

  // required ??
  sourceId?: string | number;
};

export type FeatureProperties<OriginalProperties = null> = {
  /** id and label are required for <select /> like components */

  id: string;
  /** compute name + short context for input string */
  label: string;

  name: string;
  context: string | null;

  score: number;
  type: GeocodeType;
  originalProperties: OriginalProperties;
};
