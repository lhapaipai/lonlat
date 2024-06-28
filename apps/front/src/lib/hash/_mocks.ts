import { GeoPointOption } from "pentatrion-geo";

export function createFakeFeature({
  lng = 5,
  lat = 45,
  z,
  label = "label",
  name = "name",
  context = "context",
  type = "type",
}: {
  lng?: number;
  lat?: number;
  z?: number;
  label?: string;
  name?: string;
  context?: string;
  type?: string;
}): GeoPointOption {
  return {
    id: "fake",
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: z ? [lng, lat, z] : [lng, lat],
    },
    properties: { id: "fake", score: 1, label, name, context, type },
  };
}
