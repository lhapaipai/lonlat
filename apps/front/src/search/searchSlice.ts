import { createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  FeatureProperties,
  GeoPointOption,
  getFeaturePointAltitude,
  IsochroneGeoJSON,
  reverseGeocodeLonLatFeaturePoint,
} from "pentatrion-geo";
import { Point } from "geojson";
import { errorAdded } from "pentatrion-design/redux";

type SearchState = {
  feature: GeoPointOption | null;
  isochrone: IsochroneGeoJSON | null;
};

const initialState: SearchState = {
  feature: null,
  isochrone: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchFeatureChanged(state, action: PayloadAction<GeoPointOption | null>) {
      state.feature = action.payload;
      state.isochrone = null;
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
    isochroneChanged(state, action: PayloadAction<IsochroneGeoJSON | null>) {
      state.isochrone = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const {
  searchFeatureChanged,
  searchFeaturePropertiesChanged,
  searchFeatureGeometryChanged,
  isochroneChanged,
} = searchSlice.actions;

export const selectSearchFeature = (state: RootState) => state.search.feature;
export const selectIsochrone = (state: RootState) => state.search.isochrone;

export const searchFeatureListenerMiddleware = createListenerMiddleware();
searchFeatureListenerMiddleware.startListening({
  actionCreator: searchFeatureChanged,
  effect: async ({ payload: feature }, { dispatch }) => {
    if (!feature) {
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
