import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from ".";
import { parseHashString } from "~/lib/hashUtil";
import { france, marignier } from "~/features/layer/util";
import { debug } from "~/config/constants";
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

type MapState = {
  viewState: ViewState;
  tab: string | number;
  searchEngine: SearchEngine;
  coordsUnit: CoordsUnit;
  distractionFree: boolean;
  mode: "dark" | "light";
};

const hashInfos = parseHashString();

const initialState: MapState = {
  viewState: hashInfos
    ? hashInfos.viewState
    : {
        center: debug ? [marignier.lng, marignier.lat] : [france.lng, france.lat],
        zoom: debug ? marignier.zoom : france.zoom,
        pitch: 0,
        bearing: 0,
      },
  tab: "search",
  searchEngine: "ign-address",
  coordsUnit: "lonlat",
  distractionFree: false,
  mode: getColorScheme(true),
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
    modeChanged(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
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
  modeChanged,
} = mapSlice.actions;

export const selectViewState = (state: RootState) => state.map.viewState;
export const selectTab = (state: RootState) => state.map.tab;
export const selectSearchEngine = (state: RootState) => state.map.searchEngine;
export const selectCoordsUnit = (state: RootState) => state.map.coordsUnit;
export const selectDistractionFree = (state: RootState) => state.map.distractionFree;
export const selectMode = (state: RootState) => state.map.mode;

export const modeChangedAction = (mode: "light" | "dark") => (dispatch: AppDispatch) => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(mode);

  dispatch(modeChanged(mode));
};
