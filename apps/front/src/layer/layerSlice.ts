import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BaseLayerId, OptionalLayerId } from "./layers";

interface LayerState {
  baseLayer: BaseLayerId;
  optionalLayers: OptionalLayerId[];
  terrain: boolean;
  streetView: boolean;
}

const initialState: LayerState = {
  baseLayer: "ign-raster-default_scan",
  optionalLayers: [],
  terrain: false,
  streetView: false,
};

const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    baseLayerChanged(state, action: PayloadAction<BaseLayerId>) {
      state.baseLayer = action.payload;
    },
    optionalLayerToggled(state, action: PayloadAction<OptionalLayerId>) {
      const layerId = action.payload;
      if (state.optionalLayers.includes(layerId)) {
        state.optionalLayers = state.optionalLayers.filter((id) => layerId !== id);
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

export default layerSlice.reducer;

export const { baseLayerChanged, optionalLayerToggled, terrainToggled, streetViewToggled } =
  layerSlice.actions;

export const selectBaseLayer = (state: RootState) => state.layer.baseLayer;
export const selectOptionalLayers = (state: RootState) => state.layer.optionalLayers;
export const selectTerrain = (state: RootState) => state.layer.terrain;
export const selectStreetView = (state: RootState) => state.layer.streetView;
