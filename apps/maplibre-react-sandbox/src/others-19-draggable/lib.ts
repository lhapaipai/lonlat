import { Point } from "geojson";
import { FeatureOption } from "pentatrion-design";
import { IGNAddressResponse, createIgnAddressFeaturePoint } from "pentatrion-geo";

export const handleChangeSearchValue = async (search: string) => {
  const collection = (await fetch(`/data/ign-search.geojson`).then((res) =>
    res.json(),
  )) as IGNAddressResponse;

  return collection.features.map(createIgnAddressFeaturePoint);
};

export const createUnknownFeature = (id?: string): FeatureOption<Point> => ({
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
