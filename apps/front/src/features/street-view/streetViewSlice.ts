import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/store";

type StreetViewState = {
  coords: [number, number] | null;
  pov: Pov;
};

export type Pov = {
  heading: number;
  pitch: number;
};

const initialState: StreetViewState = {
  coords: [0, 0],
  pov: {
    heading: 0,
    pitch: 0,
  },
};

const streetViewSlice = createSlice({
  name: "streetView",
  initialState,
  reducers: {
    coordsChanged(state, action: PayloadAction<[number, number]>) {
      state.coords = action.payload;
    },
    povChanged(state, action: PayloadAction<Pov>) {
      state.pov = action.payload;
    },
  },
});

export default streetViewSlice.reducer;

export const { coordsChanged, povChanged } = streetViewSlice.actions;

export const selectPegmanCoords = (state: RootState) => state.streetView.coords;
export const selectPegmanPov = (state: RootState) => state.streetView.pov;
