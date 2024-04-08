import { createNodataFeature, filterDataFeatures, GeoFeature } from "pentatrion-geo";
import {
  createAsyncThunk,
  createListenerMiddleware,
  createSelector,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { Feature, FeatureCollection, LineString } from "geojson";
import { NoDataFeature } from "pentatrion-design";

type DirectionState = {
  locations: (GeoFeature | NoDataFeature)[];
  route: Feature<LineString> | null;
};

const initialState: DirectionState = {
  locations: [createNodataFeature(), createNodataFeature()],
  route: null,
};

export type LocationPayload = { index: number; feature: GeoFeature | NoDataFeature };

const directionSlice = createSlice({
  name: "direction",
  initialState,
  reducers: {
    directionLocationsSorted(state, action: PayloadAction<(GeoFeature | NoDataFeature)[]>) {
      state.locations = action.payload;
    },
    directionLocationChanged(state, action: PayloadAction<LocationPayload>) {
      const { index, feature } = action.payload;
      if (state.locations[index] === undefined) {
        throw new Error("direction location index invalid");
      }
      state.locations[index] = feature;
    },
    directionRouteChanged(state, action: PayloadAction<Feature<LineString> | null>) {
      state.route = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRoute.fulfilled, (state, action) => {
      state.route = action.payload;
    });
  },
});

export default directionSlice.reducer;

export const { directionLocationChanged, directionLocationsSorted, directionRouteChanged } =
  directionSlice.actions;

export const directionLocationsListenerMiddleware = createListenerMiddleware();

directionLocationsListenerMiddleware.startListening({
  matcher: isAnyOf(directionLocationChanged, directionLocationsSorted),
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const validLocations = filterDataFeatures(state.direction.locations);
    if (validLocations.length >= 2) {
      dispatch(fetchRoute());
    } else {
      dispatch(directionRouteChanged(null));
    }
  },
});

export const fetchRoute = createAsyncThunk("direction/fetchRoute", async (_, { getState }) => {
  const state = getState() as RootState;

  const validLocations = filterDataFeatures(state.direction.locations);

  console.log("newState", state);

  const res = await fetch("http://localhost:8080/ors/v2/directions/driving-car/geojson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinates: validLocations.map((feature) => feature.geometry.coordinates),
    }),
  });

  const collection = (await res.json()) as FeatureCollection<LineString>;

  return collection.features.length < 1 ? null : collection.features[0];
});

export const selectDirectionLocations = (state: RootState) => state.direction.locations;
export const selectValidDirectionLocations = createSelector(selectDirectionLocations, (locations) =>
  filterDataFeatures(locations),
);
export const selectDirectionRoute = (state: RootState) => state.direction.route;
