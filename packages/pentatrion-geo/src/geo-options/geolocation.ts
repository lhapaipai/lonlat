import { nanoid } from "nanoid";
import { GeolocationOption } from "pentatrion-design";

export function createGeolocationFeature(label = "My position"): GeolocationOption {
  return {
    id: nanoid(),
    type: "geolocation",
    properties: {
      id: "geolocation",
      label: label,
      name: label,
      context: null,
      score: 1,
      type: "geolocation",
      originalProperties: null,
    },
  };
}
