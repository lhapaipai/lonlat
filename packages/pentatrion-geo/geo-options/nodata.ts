import { nanoid } from "nanoid";
import { NoDataOption } from "pentatrion-design/components/select";
import { GeoOption } from "../types";

export function createNodataFeature(id?: string): NoDataOption {
  return {
    id: id ?? nanoid(),
    type: "nodata",
  };
}

export function isNoData<T extends GeoOption>(feature: T | NoDataOption): feature is NoDataOption {
  return feature.type === "nodata";
}
