import { Feature } from "geojson";

type GeocodeType = "housenumber" | "street" | "locality" | "municipality" | "lonlat" | "unknown";

export type GeocodeProperties = {
  id: string;

  name: string;
  context: string | null;

  /** compute name + short context for input string */
  label: string;
  score: number;
  type: GeocodeType;
  originalProperties: IGNAddressProperties | null;
};

export type GeoFeature = Feature<Point, GeocodeProperties>;

type Option = {
  /* great to use uniqId for value (don't use Feature["properties"]["id"]) car same search inside routing
     create conflict instead use Feature["id"].
   */
  value: string;
  label: string;
  sourceId?: string | number;
};

export type GeoFeatureOption = Option & {
  feature: GeoFeature;
};
