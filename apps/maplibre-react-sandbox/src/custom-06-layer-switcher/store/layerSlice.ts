import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { LayerId } from "../layers";

interface LayerState {
  baseLayer: LayerId;
  elevation: boolean;
}

const initialState: LayerState = {
  baseLayer: "ign-plan_ign-standard",
  elevation: false,
};

const layerSlice = createSlice({
  name: "layer",
  initialState,
  reducers: {
    baseLayerChanged(state, action: PayloadAction<LayerId>) {
      state.baseLayer = action.payload;
    },
    elevationToggled(state) {
      state.elevation = !state.elevation;
    },
  },
});

export default layerSlice.reducer;

export const { baseLayerChanged, elevationToggled } = layerSlice.actions;

export const selectBaseLayer = (state: RootState) => state.layer.baseLayer;
export const selectElevation = (state: RootState) => state.layer.elevation;
