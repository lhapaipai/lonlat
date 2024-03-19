import { LngLat } from "maplibre-gl";
import { nanoid } from "nanoid";
import { GeoFeature } from "..";

export function createLonLatFeaturePoint(lngLat: LngLat, id?: string): GeoFeature {
  const { lng, lat } = lngLat;
  return {
    id: id ?? nanoid(),
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
    properties: {
      id: `${lng}-${lat}`,
      name: `longitude: ${lng}, latitude: ${lat}`,
      context: null,
      label: `longitude: ${lng}, latitude: ${lat}`,
      score: 1,
      type: "lonlat",
      originalProperties: null,
    },
  };
}

export function createLonLatOption(lngLat: LngLat, id?: string, sourceId?: string | number) {
  const geoFeature = createLonLatFeaturePoint(lngLat, id);
  return {
    value: geoFeature.id?.toString() || nanoid(),
    label: geoFeature.properties.label,
    feature: geoFeature,
    sourceId,
  };
}
