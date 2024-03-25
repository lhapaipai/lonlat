import { FeatureCollection } from "geojson";
import { IGNAddressProperties } from "..";
import { APISchemas } from "./openapi-types/ign-geocodage-api";
import { FeatureOption } from "pentatrion-design";

type GeocodeType =
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
