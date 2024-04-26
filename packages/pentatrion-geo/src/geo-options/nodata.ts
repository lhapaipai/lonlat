import { nanoid } from "nanoid";
import { GeoOption, NoDataOption } from "pentatrion-design";

export function createNodataFeature(id?: string): NoDataOption {
  return {
    id: id ?? nanoid(),
    type: "nodata",
  };
}

export function isNoData<T extends GeoOption>(feature: T | NoDataOption): feature is NoDataOption {
  return feature.type === "nodata";
}
