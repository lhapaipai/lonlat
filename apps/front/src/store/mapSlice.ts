import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { parseHashString } from "~/lib/hash";
import { france, marignier } from "~/features/layer/util";
import { debug } from "~/config/constants";

export type ViewState = {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
};

type MapState = {
  viewState: ViewState;
};

const hashInfos = parseHashString(window.location.hash);

const initialState: MapState = {
  viewState: hashInfos
    ? hashInfos.viewState
    : {
        center: debug
          ? [marignier.lng, marignier.lat]
          : [france.lng, france.lat],
        zoom: debug ? marignier.zoom : france.zoom,
        pitch: 0,
        bearing: 0,
      },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    viewStateChanged(state, action: PayloadAction<ViewState>) {
      state.viewState = action.payload;
    },
  },
});

export default mapSlice.reducer;
export const { viewStateChanged } = mapSlice.actions;

export const selectViewState = (state: RootState) => state.map.viewState;
export const selectViewStateZoom = (state: RootState) =>
  state.map.viewState.zoom;
