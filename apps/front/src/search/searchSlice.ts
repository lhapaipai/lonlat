import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FeatureProperties, GeoPointOption } from "pentatrion-geo";
import { Point } from "geojson";

type SearchState = {
  feature: GeoPointOption | null;
};

export type SearchPayload = GeoPointOption | null;

const initialState: SearchState = {
  feature: {
    id: "M_jA1O_saPtKVaJ1GDaBX",
    type: "Feature",
    geometry: { type: "Point", coordinates: [6.495672, 46.097353, 500] },
    properties: {
      id: "74164",
      name: "Marignier",
      context: "Haute-Savoie",
      label: "Marignier, Haute-Savoie",
      score: 0.9164926121320666,
      type: "municipality",
      originalProperties: {
        label: "Marignier",
        score: 0.9164926121320666,
        id: "74164",
        type: "municipality",
        name: "Marignier",
        postcode: "74970",
        citycode: "74164",
        x: 969973.55,
        y: 6561261.8,
        population: 6333,
        city: "Marignier",
        context: "74, Haute-Savoie, Auvergne-Rhône-Alpes",
        importance: 0.38277,
        municipality: "Marignier",
        distance: 34853,
        _type: "address",
      },
    },
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchFeatureChanged(state, action: PayloadAction<SearchPayload>) {
      state.feature = action.payload;
    },
    searchFeaturePropertiesChanged(state, action: PayloadAction<FeatureProperties>) {
      if (!state.feature) {
        return;
      }
      state.feature.properties = action.payload;
    },
    searchFeatureGeometryChanged(state, action: PayloadAction<Point>) {
      if (!state.feature || state.feature.geometry.type !== "Point") {
        return;
      }
      state.feature.geometry = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const {
  searchFeatureChanged,
  searchFeaturePropertiesChanged,
  searchFeatureGeometryChanged,
} = searchSlice.actions;

export const selectSearchFeature = (state: RootState) => state.search.feature;
