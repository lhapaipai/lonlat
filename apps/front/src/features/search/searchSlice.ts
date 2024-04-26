import { createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import {
  FeatureProperties,
  GeoPointOption,
  getFeaturePointAltitude,
  isGeolocationGeoOption,
  reverseGeocodeLonLatFeaturePoint,
} from "pentatrion-geo";
import { Point } from "geojson";
import { errorAdded } from "pentatrion-design/redux";

export type SearchFeature = GeoPointOption | null;

type SearchState = {
  feature: SearchFeature;
};

const initialState: SearchState = {
  feature: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchFeatureChanged(state, action: PayloadAction<SearchFeature>) {
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

export const searchFeatureListenerMiddleware = createListenerMiddleware();
searchFeatureListenerMiddleware.startListening({
  actionCreator: searchFeatureChanged,
  effect: async ({ payload: feature }, { dispatch }) => {
    if (!feature || isGeolocationGeoOption(feature)) {
      return;
    }

    if (feature.properties.type === "lonlat" && feature.properties.score === 0) {
      reverseGeocodeLonLatFeaturePoint(feature)
        .then((accurateProperties) => {
          if (accurateProperties && accurateProperties.type !== "lonlat") {
            dispatch(searchFeaturePropertiesChanged(accurateProperties));
          }
        })
        .catch((err) => void dispatch(errorAdded(err)));
    }

    if (!feature.geometry.coordinates[2]) {
      getFeaturePointAltitude(feature)
        .then((geometryWithAltitude) => {
          if (geometryWithAltitude) {
            dispatch(searchFeatureGeometryChanged(geometryWithAltitude));
          }
        })
        .catch((err) => void dispatch(errorAdded(err)));
    }
  },
});
