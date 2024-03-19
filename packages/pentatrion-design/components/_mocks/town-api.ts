import { GeoFeatureOption, filterFeature } from "../..";
import { GeoFeature } from "pentatrion-geo";

async function mockServerRequest(searchValue: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000);
  });
  const res = await fetch(`/town-74.geojson`);
  const features = (await res.json()).features as GeoFeature[];
  return filterFeature(features, searchValue);
}

export const handleChangeSearchValue = async (searchValue: string): Promise<GeoFeatureOption[]> => {
  const results = await mockServerRequest(searchValue);
  return results.map((result) => ({
    label: result.properties.label,
    value: result.properties.id,
    feature: result,
  }));
};

export const unknownFeature: GeoFeature = {
  id: "74001",
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [6.7321620538, 46.2661080816],
  },
  properties: {
    id: "74001",
    name: "Abondance",
    context: "Haute-Savoie",
    label: "Abondance, Haute-Savoie",
    score: 1,
    type: "municipality",
    originalProperties: {
      insee: 74001,
      code_postal: 74360,
      latitude: 46.2661080816,
      longitude: 6.7321620538,
      nom_commune: "Abondance",
      code_departement: 74,
      nom_departement: "Haute-Savoie",
      code_region: 84,
      nom_region: "Auvergne-Rhône-Alpes",
      context: "Abondance, Haute-Savoie, Auvergne-Rhône-Alpes",
    },
  },
};

export const unknownFeatureOption: GeoFeatureOption = {
  value: unknownFeature.id as string,
  label: unknownFeature.properties.label,
  feature: unknownFeature,
};
