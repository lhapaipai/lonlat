import {
  createListenerMiddleware,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
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
import { parseHashString } from "~/lib/hashUtil";

export type SearchFeature = GeoPointOption | null;

export type SearchState = {
  feature: SearchFeature;
  readOnly: boolean;
};

const hashInfos = parseHashString(window.location.hash);

const initialState: SearchState = hashInfos
  ? hashInfos.search
  : {
      feature: null,
      readOnly: false,
    };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchReadOnlyChanged(state, action: PayloadAction<boolean>) {
      state.readOnly = action.payload;
    },
    searchFeatureChanged(state, action: PayloadAction<SearchFeature>) {
      state.feature = action.payload;
    },
    searchFeaturePropertiesChanged(
      state,
      action: PayloadAction<FeatureProperties>,
    ) {
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
  searchReadOnlyChanged,
} = searchSlice.actions;

export const selectSearchFeature = (state: RootState) => state.search.feature;
export const selectSearch = (state: RootState) => state.search;

export const searchFeatureListenerMiddleware = createListenerMiddleware();
searchFeatureListenerMiddleware.startListening({
  actionCreator: searchFeatureChanged,
  effect: async ({ payload: feature }, { dispatch }) => {
    if (!feature || isGeolocationGeoOption(feature)) {
      return;
    }

    if (
      feature.properties.type === "lonlat" &&
      feature.properties.score === 0
    ) {
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
