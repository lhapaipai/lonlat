import { Feature, FeatureCollection, LineString } from "geojson";
import { AppGeoOption } from "..";

export type ORSDirectionFeature = Feature<
  LineString,
  {
    coords_hash: string;
  }
>;

export async function getRoute(features: AppGeoOption[]) {
  const res = await fetch("http://localhost:8080/ors/v2/directions/driving-car/geojson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinates: features.map((feature) => feature.geometry.coordinates),
    }),
  });

  const collection = (await res.json()) as FeatureCollection<LineString>;

  if (collection.features.length < 1) {
    return null;
  }

  const feature = collection.features[0];
  return {
    ...feature,
    properties: {
      ...feature.properties,
      coords_hash: hashCoords(features),
    },
  } as ORSDirectionFeature;
}

export function hashCoords(features: AppGeoOption[]) {
  return features
    .map((feature) => {
      const [lon, lat] = feature.geometry.coordinates;
      return `${lon}-${lat}`;
    })
    .join("|");
}
