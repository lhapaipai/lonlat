import { Feature } from "geojson";

type GeocodeType = "housenumber" | "street" | "locality" | "municipality" | "unknown";

export type GeocodeProperties = {
  id: string;
  name: string;
  context: string | null;

  /** compute name + short context for input string */
  label: string;
  score: number;
  type: GeocodeType;
  originalProperties: IGNAddressProperties;
};

export type GeoFeature = Feature<Point, GeocodeProperties>;

type Option = {
  value: string;
  label: string;
};

export type GeoFeatureOption = Option & {
  feature: GeoFeature;
};
