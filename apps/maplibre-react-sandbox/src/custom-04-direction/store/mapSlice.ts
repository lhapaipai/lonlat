import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewState } from "react-map-gl";
import { RootState } from ".";

const marignier = {
  longitude: 6.498,
  latitude: 46.089,
};

type MapState = {
  viewState: Partial<ViewState>;
  tab: string | number;
};

const initialState: MapState = {
  viewState: {
    ...marignier,
    zoom: 14,
  },
  tab: "search",
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    viewStateChanged(state, action: PayloadAction<Partial<ViewState>>) {
      state.viewState = action.payload;
    },
    tabChanged(state, action: PayloadAction<string | number>) {
      state.tab = action.payload;
    },
  },
});

export default mapSlice.reducer;
export const { viewStateChanged, tabChanged } = mapSlice.actions;

export const selectViewState = (state: RootState) => state.map.viewState;
export const selectTab = (state: RootState) => state.map.tab;
