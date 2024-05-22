import { OptionLike } from "../select";

export function getOptionLabel(option: OptionLike) {
  switch (option.type) {
    case "Feature":
      return option.properties.label;
    default:
      return option.label;
  }
}

export function getOptionValue(option: OptionLike) {
  switch (option.type) {
    case "Feature":
      return option.properties.id;
    default:
      return option.value;
  }
}
