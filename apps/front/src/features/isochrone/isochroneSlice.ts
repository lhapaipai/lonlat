import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeoPointOption, IsochroneOptions } from "pentatrion-geo/types";
import { IsochroneGeoJSON } from "pentatrion-geo/api";
import { RootState } from "~/store";

type IsochroneState = {
  referenceFeature: GeoPointOption | null;
  feature: IsochroneGeoJSON | null;
} & IsochroneOptions;

const initialState: IsochroneState = {
  referenceFeature: null,
  feature: null,
  costType: "time",
  costValue: 30,
  direction: "departure",
  profile: "car",
  constraints: {
    avoidBridges: false,
    avoidHighways: false,
    avoidTunnels: false,
  },
};

const isochroneSlice = createSlice({
  name: "isochrone",
  initialState,
  reducers: {
    referenceFeatureChanged(
      state,
      action: PayloadAction<GeoPointOption | null>,
    ) {
      state.referenceFeature = action.payload;
    },

    featureChanged(state, action: PayloadAction<IsochroneGeoJSON | null>) {
      state.feature = action.payload;
    },
    costTypeChanged(
      state,
      action: PayloadAction<IsochroneOptions["costType"]>,
    ) {
      if (state.costType === action.payload) {
        return;
      }
      state.costType = action.payload;
      state.feature = null;

      if (state.costType === "distance") {
        state.costValue = 10;
      } else if (state.costType === "time") {
        state.costValue = 30;
      }
    },
    costValueChanged(
      state,
      action: PayloadAction<IsochroneOptions["costValue"]>,
    ) {
      if (state.costValue === action.payload) {
        return;
      }
      state.costValue = action.payload;
      state.feature = null;
    },
    directionChanged(
      state,
      action: PayloadAction<IsochroneOptions["direction"]>,
    ) {
      if (state.direction === action.payload) {
        return;
      }
      state.direction = action.payload;
      state.feature = null;
    },
    profileChanged(state, action: PayloadAction<IsochroneOptions["profile"]>) {
      if (state.profile === action.payload) {
        return;
      }
      state.profile = action.payload;
      state.feature = null;
    },
    constraintChanged(
      state,
      action: PayloadAction<{
        key: keyof IsochroneOptions["constraints"];
        value: boolean;
      }>,
    ) {
      const { key, value } = action.payload;
      if (state.constraints[key] === value) {
        return;
      }

      state.constraints[key] = value;
      state.feature = null;
    },
  },
});

export default isochroneSlice.reducer;

export const {
  referenceFeatureChanged,
  featureChanged,
  costTypeChanged,
  costValueChanged,
  directionChanged,
  profileChanged,
  constraintChanged,
} = isochroneSlice.actions;

export const selectIsochrone = (state: RootState) => state.isochrone;
export const selectIsochroneFeature = (state: RootState) =>
  state.isochrone.feature;
export const selectIsochroneReferenceFeature = (state: RootState) =>
  state.isochrone.referenceFeature;
