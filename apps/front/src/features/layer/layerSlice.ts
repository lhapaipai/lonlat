import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import { BaseLayerId, baseLayersById, OptionalLayerId } from "./layers";
import { parseHashString } from "~/lib/hashUtil";

interface LayerState {
  baseLayer: BaseLayerId;
  optionalLayers: OptionalLayerId[];
  terrain: boolean;
  streetView: boolean;
}

const hashInfos = parseHashString(window.location.hash);
const baseLayer: BaseLayerId =
  hashInfos && baseLayersById[hashInfos.baseLayer as BaseLayerId]
    ? (hashInfos.baseLayer as BaseLayerId)
    : "ign-raster-default_scan";

const initialState: LayerState = {
  baseLayer,
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

export default layerSlice.reducer;

export const {
  baseLayerChanged,
  optionalLayerToggled,
  terrainToggled,
  streetViewToggled,
} = layerSlice.actions;

export const selectLayer = (state: RootState) => state.layer;
export const selectBaseLayer = (state: RootState) => state.layer.baseLayer;
