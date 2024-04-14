import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

const marignier = {
  lng: 6.498,
  lat: 46.089,
};

type ViewState = {
  center: [number, number];
  zoom: number;
};

export const searchEngines = ["ign-address", "c2c", "nominatim"] as const;
export type SearchEngine = (typeof searchEngines)[number];

export const coordsUnits = ["lonlat", "latlon", "dms"] as const;
export type CoordsUnit = (typeof coordsUnits)[number];

type MapState = {
  viewState: ViewState;
  tab: string | number;
  searchEngine: SearchEngine;
  coordsUnit: CoordsUnit;
  distractionFree: boolean;
};

const initialState: MapState = {
  viewState: {
    center: [marignier.lng, marignier.lat],
    zoom: 14,
  },
  tab: "search",
  searchEngine: "ign-address",
  coordsUnit: "lonlat",
  distractionFree: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    viewStateChanged(state, action: PayloadAction<ViewState>) {
      state.viewState = action.payload;
    },
    tabChanged(state, action: PayloadAction<string | number>) {
      state.tab = action.payload;
    },
    searchEngineChanged(state, action: PayloadAction<SearchEngine>) {
      state.searchEngine = action.payload;
    },
    coordsUnitChanged(state, action: PayloadAction<CoordsUnit | undefined>) {
      if (action.payload) {
        state.coordsUnit = action.payload;
      } else {
        const currentIndex = coordsUnits.findIndex((c) => c === state.coordsUnit);
        state.coordsUnit = coordsUnits[(currentIndex + 1) % coordsUnits.length];
      }
    },
    distractionFreeChanged(state, action: PayloadAction<boolean>) {
      state.distractionFree = action.payload;
    },
  },
});

export default mapSlice.reducer;
export const {
  distractionFreeChanged,
  viewStateChanged,
  tabChanged,
  searchEngineChanged,
  coordsUnitChanged,
} = mapSlice.actions;

export const selectViewState = (state: RootState) => state.map.viewState;
export const selectTab = (state: RootState) => state.map.tab;
export const selectSearchEngine = (state: RootState) => state.map.searchEngine;
export const selectCoordsUnit = (state: RootState) => state.map.coordsUnit;
export const selectDistractionFree = (state: RootState) => state.map.distractionFree;
