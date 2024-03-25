import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { LayerId } from "../layers";

interface LayerState {
  baseLayer: LayerId;
}

const initialState: LayerState = {
  baseLayer: "ign-plan_ign-standard",
};

const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    baseLayerChanged(state, action: PayloadAction<LayerId>) {
      state.baseLayer = action.payload;
    },
  },
});

export default layerSlice.reducer;

export const { baseLayerChanged } = layerSlice.actions;

export const selectBaseLayer = (state: RootState) => state.layer.baseLayer;
