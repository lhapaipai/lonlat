import { OptionLike } from "../select";

export function getLabel(option: OptionLike) {
  switch (option.type) {
    case "Feature":
    case "geolocation":
      return option.properties.label;
    default:
      return option.label;
  }
}

export function getValue(option: OptionLike) {
  switch (option.type) {
    case "Feature":
    case "geolocation":
      return option.properties.id;
    default:
      return option.value;
  }
}
