import { OptionLike } from "../select";

export function getLabel(option: OptionLike) {
  return option.type === "Feature" ? option.properties.label : option.label;
}

export function getValue(option: OptionLike) {
  return option.type === "Feature" ? option.properties.id : option.value;
}
