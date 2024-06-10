import { Point } from "geojson";
import { GeoOption } from "pentatrion-design";
import { createIgnAddressFeaturePoint } from "pentatrion-geo";

export const handleChangeSearchValue = async (search: string) => {
  console.log("search", search);
  const collection = (await fetch(`/data/ign-search.geojson`).then((res) =>
    res.json(),
  )) as any;

  return collection.features.map((feature: any) => {
    return createIgnAddressFeaturePoint(feature);
  });
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
