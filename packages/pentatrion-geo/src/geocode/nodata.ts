import { FeatureOption, NoDataFeature } from "pentatrion-design";

export function createNodataFeature(id?: string): NoDataFeature {
  return {
    id: id ?? Math.floor(Math.random() * 100000).toString(),
    type: "nodata",
  };
}

export function isNoData(feature: FeatureOption | NoDataFeature): feature is NoDataFeature {
  return feature.type === "nodata";
}
