import { GeoOption, GeoPointOption } from "../../types";
import { filterFeature } from "../../geo-options";
import { Point } from "geojson";

async function mockServerRequest(searchValue: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000);
  });
  const res = await fetch(`/town-74.geojson`);
  const features = (await res.json()).features as GeoPointOption[];
  return filterFeature(features, searchValue);
}

export const handleChangeSearchValue = async (searchValue: string): Promise<GeoPointOption[]> => {
  const results = await mockServerRequest(searchValue);
  return results;
};

export const createUnknownFeature = (id?: string): GeoOption<Point> => ({
  id: id ?? "74001",
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [6.7321620538, 46.2661080816],
  },
  properties: {
    id: "74001",
    name: "Unknown",
    context: "Haute-Savoie",
    label: "Unknown, Haute-Savoie",
    score: 1,
    type: "municipality",
    originalProperties: null,
  },
});
