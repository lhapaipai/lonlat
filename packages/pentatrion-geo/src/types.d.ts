import { BBox, Geometry } from "geojson";
import { GeoOption } from "pentatrion-design";

export type LngLatObj = {
  lng: number;
  lat: number;
};

export type GeocodeType = AddressType | LonLatType;

export type AddressType = "housenumber" | "street" | "locality" | "municipality" | "unknown";
export type LonLatType = "lonlat";

export type FeatureProperties<T extends string = "unknown"> = {
  /** id and label are required for <select /> like components */

  id: string;
  /** compute name + short context for input string */
  label: string;

  name: string;
  context: string | null;

  score: number;
  type: T;

  originalProperties: any;
};

export type GeoOption<G extends Geometry | null = Geometry, T extends string = "unknown"> = {
  id: string;
  type: "Feature";
  properties: FeatureProperties<T>;
  geometry: G;
  bbox?: BBox | undefined;
};

// Prepared data
export type IGNAddressGeoOption = GeoOption<Point, AddressType>;
export type LonLatGeoOption = GeoOption<Point, LonLatType>;

export type AppGeoOption = IGNAddressGeoOption | LonLatGeoOption;
