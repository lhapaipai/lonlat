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

    if (feature.properties.type !== "lonlat" || feature.properties.score !== 0) {
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
