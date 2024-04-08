import { GeoOption, NoDataOption } from "pentatrion-design";

export function createNodataFeature(id?: string): NoDataOption {
  return {
    id: id ?? Math.floor(Math.random() * 100000).toString(),
    type: "nodata",
  };
}

export function isNoData(feature: GeoOption | NoDataOption): feature is NoDataOption {
  return feature.type === "nodata";
}
