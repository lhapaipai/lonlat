import { createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const lonlatFeatureListenerMiddleware = createListenerMiddleware();

lonlatFeatureListenerMiddleware.startListening({
  actionCreator: searchFeatureChanged,
  effect: async ({ type, payload }, { getState, dispatch }) => {
    console.log("lonlatFeatureListenerMiddleware", payload);
  },
});

export const selectSearchFeature = (state: RootState) => state.search.feature;
