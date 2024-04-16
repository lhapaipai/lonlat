import {
  createNodataFeature,
  filterDataFeatures,
  GeoPointOption,
  RouteFeatureResponse,
  FeatureProperties,
  reverseGeocodeLonLatFeaturePoint,
  hashRoute,
  DirectionOptions,
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
import { orsRoute } from "~/lib/api/openRouteService";
import { errorAdded } from "pentatrion-design/redux";
import { FeatureCollection, Point } from "geojson";

type DirectionState = {
  wayPoints: (GeoPointOption | NoDataOption)[];
  route: RouteFeatureResponse | null;
  permissions: {
    highways: boolean;
    tollways: boolean;
    border: boolean;
  };
  optimization: DirectionOptions["optimization"];
  profile: DirectionOptions["profile"];
};

const initialState: DirectionState = {
  wayPoints: [createNodataFeature(), createNodataFeature()],
  route: null,
  permissions: {
    highways: true,
    tollways: true,
    border: true,
  },
  optimization: "recommended",
  profile: "car",
};

export type WayPointPayload = { index: number; feature: GeoPointOption | NoDataOption };

const directionSlice = createSlice({
  name: "direction",
  initialState,
  reducers: {
    directionWayPointsAddedFromSearch: {
      reducer(state, action: PayloadAction<(GeoPointOption | NoDataOption)[]>) {
        state.wayPoints = action.payload;
      },
      prepare(wayPoint: GeoPointOption) {
        return {
          payload: [createNodataFeature(), wayPoint],
        };
      },
    },
    optimizationChanged(state, action: PayloadAction<DirectionOptions["optimization"]>) {
      state.optimization = action.payload;
    },
    profileChanged(state, action: PayloadAction<DirectionOptions["profile"]>) {
      state.profile = action.payload;
    },
    permissionChanged(
      state,
      action: PayloadAction<{ key: keyof DirectionState["permissions"]; value: boolean }>,
    ) {
      const { key, value } = action.payload;
      state.permissions[key] = value;
    },
    directionWayPointsChanged(state, action: PayloadAction<(GeoPointOption | NoDataOption)[]>) {
      state.wayPoints = action.payload;
    },
    directionWayPointChanged(state, action: PayloadAction<WayPointPayload>) {
      const { index, feature } = action.payload;
      if (state.wayPoints[index] === undefined) {
        throw new Error("direction wayPoint index invalid");
      }
      state.wayPoints[index] = feature;
    },
    directionWayPointPropertiesChanged(
      state,
      action: PayloadAction<{ index: number; properties: FeatureProperties }>,
    ) {
      const { index, properties } = action.payload;
      if (state.wayPoints[index] === undefined || state.wayPoints[index].type === "nodata") {
        throw new Error("direction wayPoint index invalid");
      }
      (state.wayPoints[index] as GeoPointOption).properties = properties;
    },
    directionWayPointRemoved(state, action: PayloadAction<number>) {
      state.wayPoints = state.wayPoints.filter((_, idx) => idx !== action.payload);
    },
    directionWayPointInsertAt(state, action: PayloadAction<WayPointPayload>) {
      const { feature, index } = action.payload;
      state.wayPoints.splice(index, 0, feature);
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
  directionWayPointsAddedFromSearch,
  directionWayPointChanged,
  directionWayPointPropertiesChanged,
  directionWayPointsChanged,
  directionRouteChanged,
  directionWayPointRemoved,
  directionWayPointInsertAt,
  profileChanged,
  permissionChanged,
  optimizationChanged,
} = directionSlice.actions;

export const selectDirectionWayPoints = (state: RootState) => state.direction.wayPoints;
export const selectValidDirectionWayPoints = createSelector(selectDirectionWayPoints, (wayPoints) =>
  filterDataFeatures(wayPoints),
);
export const selectDirectionRoute = (state: RootState) => state.direction.route;

export const selectDirectionWaypoints = createSelector(
  selectDirectionRoute,
  (route): null | FeatureCollection<Point> => {
    if (!route) {
      return null;
    }
    return {
      type: "FeatureCollection",
      features: route.properties.wayPoints,
    };
  },
);

export const selectDirection = (state: RootState) => state.direction;

export const directionWayPointsListenerMiddleware = createListenerMiddleware();
directionWayPointsListenerMiddleware.startListening({
  matcher: isAnyOf(
    directionWayPointChanged,
    directionWayPointsChanged,
    directionWayPointRemoved,
    directionWayPointInsertAt,
    profileChanged,
    permissionChanged,
    optimizationChanged,
  ),
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { wayPoints, optimization, permissions, profile } = state.direction;
    const validWayPoints = filterDataFeatures(wayPoints);
    if (validWayPoints.length >= 2) {
      const newHash = hashRoute(validWayPoints, optimization, profile, permissions);
      if (!state.direction.route || newHash !== state.direction.route.properties.hash) {
        dispatch(fetchRoute());
      }
    } else {
      dispatch(directionRouteChanged(null));
    }
  },
});

export const fetchRoute = createAsyncThunk("direction/fetchRoute", async (_, { getState }) => {
  const state = getState() as RootState;
  const { wayPoints, optimization, permissions, profile } = state.direction;
  const validWayPoints = filterDataFeatures(wayPoints);
  console.log("fetching route");

  // return await ignItineraire(
  //   validWayPoints,
  //   {
  //     optimization,
  //     profile,
  //   },
  //   permissions,
  // );
  return await orsRoute(
    validWayPoints,
    {
      optimization,
      profile,
    },
    permissions,
  );
});

export const directionWayPointListenerMiddleware = createListenerMiddleware();
directionWayPointListenerMiddleware.startListening({
  actionCreator: directionWayPointChanged,
  effect: async ({ payload: { index, feature } }, { dispatch }) => {
    if (!feature || feature.type === "nodata") {
      return;
    }

    if (feature.properties.type === "lonlat" && feature.properties.score === 0) {
      reverseGeocodeLonLatFeaturePoint(feature)
        .then((accurateProperties) => {
          if (accurateProperties && accurateProperties.type !== "lonlat") {
            dispatch(
              directionWayPointPropertiesChanged({
                index,
                properties: accurateProperties,
              }),
            );
          }
        })
        .catch((err) => void dispatch(errorAdded(err)));
    }
  },
});
