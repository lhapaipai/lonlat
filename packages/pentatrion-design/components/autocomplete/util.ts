import { FeatureOption, NoDataFeature, OptionLike } from "../select";

export function getLabel(option: OptionLike) {
  return option.type === "Feature" ? option.properties.label : option.label;
}

export function getValue(option: OptionLike) {
  return option.type === "Feature" ? option.properties.id : option.value;
}

export function filterDataFeatures(features: (FeatureOption | NoDataFeature)[]) {
  return features.filter((f) => f.type !== "nodata") as FeatureOption[];
}
