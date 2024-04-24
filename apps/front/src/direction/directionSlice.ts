import {
  createNodataFeature,
  filterDataFeatures,
  GeoPointOption,
  RouteFeatureResponse,
  FeatureProperties,
  reverseGeocodeLonLatFeaturePoint,
  hashRoute,
  DirectionOptions,
  orsRoute,
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
import { errorAdded } from "pentatrion-design/redux";
import { FeatureCollection, Point } from "geojson";
import { openRouteServiceToken, openRouteServiceUrl } from "~/config/constants";

type WayPoint = GeoPointOption | NoDataOption;

type DirectionState = {
  wayPoints: WayPoint[];
  route: RouteFeatureResponse | null;
  constraints: {
    avoidHighways: boolean;
    avoidTollways: boolean;
    avoidBorders: boolean;
  };
  optimization: DirectionOptions["optimization"];
  profile: DirectionOptions["profile"];
};

const initialState: DirectionState = {
  wayPoints: [createNodataFeature(), createNodataFeature()],
  route: null,
  constraints: {
    avoidHighways: false,
    avoidTollways: false,
    avoidBorders: false,
  },
  optimization: "recommended",
  profile: "car",
};

export type WayPointPayload = { index: number; feature: WayPoint };

const directionSlice = createSlice({
  name: "direction",
  initialState,
  reducers: {
    directionWayPointsAddedFromSearch: {
      reducer(state, action: PayloadAction<WayPoint[]>) {
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
    constraintChanged(
      state,
      action: PayloadAction<{ key: keyof DirectionState["constraints"]; value: boolean }>,
    ) {
      const { key, value } = action.payload;
      state.constraints[key] = value;
    },
    directionWayPointsChanged(state, action: PayloadAction<WayPoint[]>) {
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
  constraintChanged,
  optimizationChanged,
} = directionSlice.actions;

export const selectDirectionWayPoints = (state: RootState) => state.direction.wayPoints;
export const selectValidDirectionWayPoints = createSelector(selectDirectionWayPoints, (wayPoints) =>
  filterDataFeatures(wayPoints),
);
export const selectDirectionRoute = (state: RootState) => state.direction.route;

export const selectDirectionWayPointsGeojson = createSelector(
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
    constraintChanged,
    optimizationChanged,
  ),
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { wayPoints, optimization, constraints, profile } = state.direction;
    const validWayPoints = filterDataFeatures(wayPoints);
    if (validWayPoints.length >= 2) {
      const newHash = hashRoute(validWayPoints, { optimization, constraints, profile });
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
  const { wayPoints, optimization, constraints, profile } = state.direction;
  const validWayPoints = filterDataFeatures(wayPoints);

  return await orsRoute(
    validWayPoints,
    {
      optimization,
      profile,
      constraints,
    },
    openRouteServiceToken,
    openRouteServiceUrl,
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
