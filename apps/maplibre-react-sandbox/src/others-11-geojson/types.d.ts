import { Feature, FeatureCollection, MultiPolygon } from "geojson";

export type DataProps = {
  name: string;
  income: {
    [year: string]: number;
  };
};

export type ProcessedDataProps = DataProps & {
  value: number;
  percentile: number;
};

export type RawFeatures = FeatureCollection<MultiPolygon, DataProps>;
export type RawFeature = Feature<MultiPolygon, DataProps>;

export type ProcessedFeatures = FeatureCollection<MultiPolygon, ProcessedDataProps>;
export type ProcessedFeature = Feature<MultiPolygon, ProcessedDataProps>;
