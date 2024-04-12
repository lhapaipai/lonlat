import {
  createNodataFeature,
  filterDataFeatures,
  hashCoords,
  GeoPointOption,
  RouteFeatureResponse,
} from "pentatrion-geo";
import {
  createAsyncThunk,
  createListenerMiddleware,
  createSelector,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NoDataOption } from "pentatrion-design";
import { FeatureCollection, Feature, Point } from "geojson";
import { getRoute } from "~/lib/api/openRouteService";

type DirectionState = {
  locations: (GeoPointOption | NoDataOption)[];
  route: RouteFeatureResponse | null;
};

const initialState: DirectionState = {
  locations: [createNodataFeature(), createNodataFeature()],
  route: null,
};

export type LocationPayload = { index: number; feature: GeoPointOption | NoDataOption };

const directionSlice = createSlice({
  name: "direction",
  initialState,
  reducers: {
    directionLocationsSorted(state, action: PayloadAction<(GeoPointOption | NoDataOption)[]>) {
      state.locations = action.payload;
    },
    directionLocationChanged(state, action: PayloadAction<LocationPayload>) {
      const { index, feature } = action.payload;
      if (state.locations[index] === undefined) {
        throw new Error("direction location index invalid");
      }
      state.locations[index] = feature;
    },
    directionLocationRemoved(state, action: PayloadAction<number>) {
      state.locations = state.locations.filter((_, idx) => idx !== action.payload);
    },
    directionLocationInsertAt(state, action: PayloadAction<LocationPayload>) {
      const { feature, index } = action.payload;
      state.locations.splice(index, 0, feature);
    },
    directionRouteChanged(state, action: PayloadAction<RouteFeatureResponse | null>) {
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

export const {
  directionLocationChanged,
  directionLocationsSorted,
  directionRouteChanged,
  directionLocationRemoved,
  directionLocationInsertAt,
} = directionSlice.actions;

export const directionLocationsListenerMiddleware = createListenerMiddleware();

directionLocationsListenerMiddleware.startListening({
  matcher: isAnyOf(
    directionLocationChanged,
    directionLocationsSorted,
    directionLocationRemoved,
    directionLocationInsertAt,
  ),
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const validLocations = filterDataFeatures(state.direction.locations);
    if (validLocations.length >= 2) {
      const newHash = hashCoords(validLocations);
      if (!state.direction.route || newHash !== state.direction.route.properties.coords_hash) {
        dispatch(fetchRoute());
      }
    } else {
      dispatch(directionRouteChanged(null));
    }
  },
});

export const fetchRoute = createAsyncThunk("direction/fetchRoute", async (_, { getState }) => {
  const state = getState() as RootState;
  const validLocations = filterDataFeatures(state.direction.locations);

  return await getRoute(validLocations);
});

export const selectDirectionLocations = (state: RootState) => state.direction.locations;
export const selectValidDirectionLocations = createSelector(selectDirectionLocations, (locations) =>
  filterDataFeatures(locations),
);
export const selectDirectionRoute = (state: RootState) => state.direction.route;

export const selectDirectionWaypoints = createSelector(selectDirectionRoute, (route) => {
  if (!route) {
    return null;
  }

  const features: Feature<Point>[] = route.properties.way_points.map((index) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: route.geometry.coordinates[index],
    },
    properties: {},
  }));

  const geojson: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features,
  };
  return geojson;
});