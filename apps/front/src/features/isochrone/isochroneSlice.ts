import { createSlice } from "@reduxjs/toolkit";
import { Position } from "geojson";
import { IsochroneGeoJSON, IsochroneOptions } from "pentatrion-geo";

type IsochroneState = {
  point: Position | null;
  feature: IsochroneGeoJSON | null;
} & IsochroneOptions;

const initialState: IsochroneState = {
  point: null,
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
  reducers: {},
});

export default isochroneSlice.reducer;
