import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

const marignier = {
  lng: 6.498,
  lat: 46.089,
};

type ViewState = {
  center: [number, number];
  zoom: number;
};

type MapState = {
  viewState: ViewState;
  tab: string | number;
};

const initialState: MapState = {
  viewState: {
    center: [marignier.lng, marignier.lat],
    zoom: 14,
  },
  tab: "search",
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    viewStateChanged(state, action: PayloadAction<ViewState>) {
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
