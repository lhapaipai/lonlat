import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { GeoOption } from "pentatrion-geo";

type SearchState = {
  feature: GeoOption | null;
};

export type SearchPayload = GeoOption | null;

const initialState: SearchState = {
  feature: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchFeatureChanged(state, action: PayloadAction<SearchPayload>) {
      state.feature = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const { searchFeatureChanged } = searchSlice.actions;

export const selectSearchFeature = (state: RootState) => state.search.feature;
