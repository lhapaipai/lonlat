import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import { parseHashString } from "~/lib/hash";
import { getColorScheme } from "~/lib/util";

export type ViewState = {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
};

export const searchEngines = ["ign-address", "c2c", "ors", "coords"] as const;
export type SearchEngine = (typeof searchEngines)[number];

export const coordsUnits = ["lonlat", "latlon", "dms"] as const;
export type CoordsUnit = (typeof coordsUnits)[number];

type ConfigState = {
  readOnly: boolean;
  tab: string | number;
  searchEngine: SearchEngine;
  coordsUnit: CoordsUnit;
  distractionFree: boolean;
  mode: "dark" | "light";
};

const hashInfos = parseHashString(window.location.hash);

const initialState: ConfigState = {
  readOnly: false,
  tab: hashInfos?.direction ? "direction" : "search",
  searchEngine: "ign-address",
  coordsUnit: "lonlat",
  distractionFree: false,
  mode: getColorScheme(true),
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    readOnlyChanged(state, action: PayloadAction<boolean>) {
      state.readOnly = action.payload;
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
        const currentIndex = coordsUnits.findIndex(
          (c) => c === state.coordsUnit,
        );
        state.coordsUnit = coordsUnits[(currentIndex + 1) % coordsUnits.length];
      }
    },
    distractionFreeChanged(state, action: PayloadAction<boolean>) {
      state.distractionFree = action.payload;
    },
    modeChanged(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },
  },
});

export default configSlice.reducer;
export const {
  distractionFreeChanged,
  tabChanged,
  searchEngineChanged,
  coordsUnitChanged,
  modeChanged,
  readOnlyChanged,
} = configSlice.actions;

export const selectTab = (state: RootState) => state.config.tab;
export const selectSearchEngine = (state: RootState) =>
  state.config.searchEngine;
export const selectCoordsUnit = (state: RootState) => state.config.coordsUnit;
export const selectDistractionFree = (state: RootState) =>
  state.config.distractionFree;
export const selectMode = (state: RootState) => state.config.mode;
export const selectReadOnly = (state: RootState) => state.config.readOnly;

export const modeChangedAction =
  (mode: "light" | "dark") => (dispatch: AppDispatch) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);

    dispatch(modeChanged(mode));
  };
