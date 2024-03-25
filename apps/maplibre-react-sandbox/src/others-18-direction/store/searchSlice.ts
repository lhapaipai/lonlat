import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { FeatureOption } from "pentatrion-design";

type SearchState = {
  feature: FeatureOption | null;
};

const initialState: SearchState = {
  feature: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchFeatureChanged(state, action: PayloadAction<FeatureOption | null>) {
      state.feature = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const { searchFeatureChanged } = searchSlice.actions;

export const selectSearchFeature = (state: RootState) => state.search.feature;
