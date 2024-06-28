import { DirectionState } from "~/features/direction/directionSlice";
import { SearchState } from "~/features/search/searchSlice";
import { ViewState } from "~/store/mapSlice";

export type HashData = {
  baseLayer: string;
  viewState: ViewState;
  search: SearchState | null;
  direction: DirectionState | null;
};
