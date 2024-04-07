import { BBox, Geometry } from "geojson";

export type OptionLike = Option | FeatureOption;

export type Option = {
  type?: "Option";
  value: string;
  label: string;
  sourceId?: string | number;
};

export type NoDataFeature = {
  id: string;
  type: "nodata";
};

/** For compatibility with OptionLike. get original types from pentatrion-geo */
type FeatureOption<G extends Geometry | null = Geometry, OriginalProperties = any> = {
  id: string;
  type: "Feature";
  properties: FeatureProperties<OriginalProperties>;
  sourceId?: string | number;

  geometry: G;
  bbox?: BBox | undefined;

  // required ??
  sourceId?: string | number;
};

type FeatureProperties<OriginalProperties = null> = {
  id: string;
  label: string;
  name: string;
  context: string | null;
  score: number;
  type: string; // GeocodeType; ??
  originalProperties: OriginalProperties;
};
