import { DirectionState } from "~/features/direction/directionSlice";
import { SearchState } from "~/features/search/searchSlice";
import { MapState } from "~/features/map/mapSlice";
import { ConfigState } from "~/store/configSlice";

export type HashData = {
  config: ConfigState | null;
  direction: DirectionState | null;
  map: MapState | null;
  search: SearchState | null;
};
