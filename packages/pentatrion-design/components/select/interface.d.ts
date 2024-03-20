export type OptionLike = Option | FeatureOption;

export type Option = {
  type?: "Option";
  value: string;
  label: string;
  sourceId?: string | number;
};

export type FeatureOption<G extends Geometry | null = Geometry, OriginalProperties = null> = {
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
