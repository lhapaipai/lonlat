import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import { france, marignier } from "~/features/map/util";
import { debug } from "~/config/constants";
import { BaseLayerId, OptionalLayerId } from "./layers";
import { parseHashString } from "~/store/hash";

export type ViewState = {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
};

export type MapState = {
  viewState: ViewState;
  baseLayer: BaseLayerId;
  optionalLayers: OptionalLayerId[];
  terrain: boolean;
  streetView: boolean;
};

const hashInfos = parseHashString(window.location.hash);

const initialState: MapState = hashInfos?.map
  ? hashInfos.map
  : {
      baseLayer: "ign-raster-default_scan",
      viewState: {
        center: debug
          ? [marignier.lng, marignier.lat]
          : [france.lng, france.lat],
        zoom: debug ? marignier.zoom : france.zoom,
        pitch: 0,
        bearing: 0,
      },
      optionalLayers: [],
      terrain: false,
      streetView: false,
    };

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    viewStateChanged(state, action: PayloadAction<ViewState>) {
      state.viewState = action.payload;
    },
    baseLayerChanged(state, action: PayloadAction<BaseLayerId>) {
      state.baseLayer = action.payload;
    },
    optionalLayerToggled(state, action: PayloadAction<OptionalLayerId>) {
      const layerId = action.payload;
      if (state.optionalLayers.includes(layerId)) {
        state.optionalLayers = state.optionalLayers.filter(
          (id) => layerId !== id,
        );
      } else {
        state.optionalLayers.push(layerId);
      }
    },
    terrainToggled(state) {
      state.terrain = !state.terrain;
    },
    streetViewToggled(state, action: PayloadAction<boolean | undefined>) {
      const status = action.payload;
      state.streetView = status === undefined ? !state.streetView : status;
    },
  },
});

export default mapSlice.reducer;
export const {
  viewStateChanged,
  baseLayerChanged,
  optionalLayerToggled,
  terrainToggled,
  streetViewToggled,
} = mapSlice.actions;

export const selectViewState = (state: RootState) => state.map.viewState;
export const selectViewStateZoom = (state: RootState) =>
  state.map.viewState.zoom;
export const selectMap = (state: RootState) => state.map;
export const selectBaseLayer = (state: RootState) => state.map.baseLayer;
export const selectOptionalLayers = (state: RootState) =>
  state.map.optionalLayers;
export const selectTerrain = (state: RootState) => state.map.terrain;
export const selectStreetView = (state: RootState) => state.map.streetView;
