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

export type IGNAddressProperties = APISchemas["AddressProperties"];
export type IGNAddressResponse = FeatureCollection<Point, APISchemas["AddressProperties"]>;

// IGNAddressProperties | null
export type GeoFeature =
  | FeatureOption<Point, IGNAddressProperties>

  /** longitude - latitude only */
  | FeatureOption<Point, null>;
