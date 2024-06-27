import { SearchFeature } from "~/features/search/searchSlice";
import { ViewState } from "~/store/mapSlice";

export type HashData = {
  baseLayer: string;
  viewState: ViewState;
  search: SearchHash;
};

export type SearchHash = {
  feature: SearchFeature | null;
  readOnly: boolean;
};
