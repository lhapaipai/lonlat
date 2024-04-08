import { BBox, FeatureCollection, Geometry } from "geojson";
import { IGNAddressProperties } from "..";
import { APISchemas } from "./openapi-types/ign-geocodage-api";
import { FeatureOption } from "pentatrion-design";

export type LngLatObj = {
  lng: number;
  lat: number;
};

export type GeocodeType =
  | "housenumber"
  | "street"
  | "locality"
  | "municipality"
  | "lonlat"
  | "unknown"
  | "nodata";

export type FeatureProperties<OriginalProperties = null> = {
  /** id and label are required for <select /> like components */

  id: string;
  /** compute name + short context for input string */
  label: string;

  name: string;
  context: string | null;

  score: number;
  type: string; // GeocodeType; ??
  originalProperties: OriginalProperties;
};

export type FeatureOption<G extends Geometry | null = Geometry, OriginalProperties = any> = {
  id: string;

  type: "Feature";
  properties: FeatureProperties<OriginalProperties>;
  geometry: G;

  bbox?: BBox | undefined;
};

// Raw data
export type IGNAddressProperties = APISchemas["AddressProperties"];
export type IGNAddressReverseProperties = APISchemas["AddressReverseProperties"];
export type IGNAddressResponse = FeatureCollection<Point, IGNAddressProperties>;
export type IGNAddressReverseResponse = FeatureCollection<Point, IGNAddressReverseProperties>;

// Prepared data
// IGNAddressReverseResponse and IGNAddressResponse are converted into IGNAddressFeatureOption
export type IGNAddressFeatureOption = FeatureOption<Point, IGNAddressProperties>;
export type LonLatFeatureOption = FeatureOption<Point, null>;

// IGNAddressProperties | null
export type GeoFeature = IGNAddressFeatureOption | LonLatFeatureOption;
