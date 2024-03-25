import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewState } from "react-map-gl";
import { RootState } from ".";

const marignier = {
  longitude: 6.498,
  latitude: 46.089,
};

type MapState = {
  viewState: Partial<ViewState>;
};

const initialState: MapState = {
  viewState: {
    ...marignier,
    zoom: 14,
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    viewStateChanged(state, action: PayloadAction<Partial<ViewState>>) {
      state.viewState = action.payload;
    },
  },
});

export default mapSlice.reducer;

export const { viewStateChanged } = mapSlice.actions;

export const selectViewState = (state: RootState) => state.map.viewState;
