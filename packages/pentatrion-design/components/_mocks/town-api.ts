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
