import {
  createNodataFeature,
  filterDataFeatures,
  GeoPointOption,
  hashRoute,
  orsRoute,
  reverseGeocodeLonLatFeaturePoint,
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
import { FeatureProperties, GeolocationOption, NoDataOption } from "pentatrion-design";
import { FeatureCollection, Point } from "geojson";
import { errorAdded } from "pentatrion-design/redux";

type DirectionState = {
  wayPoints: (GeoPointOption | GeolocationOption | NoDataOption)[];
  route: RouteFeatureResponse | null;
};

const initialState: DirectionState = {
  wayPoints: [createNodataFeature(), createNodataFeature()],
  route: null,
};

export type WayPointPayload = { index: number; feature: GeoPointOption | NoDataOption };

const directionSlice = createSlice({
  name: "direction",
  initialState,
  reducers: {
    directionWayPointsSorted(state, action: PayloadAction<(GeoPointOption | NoDataOption)[]>) {
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
  directionWayPointChanged,
  directionWayPointsSorted,
  directionRouteChanged,
  directionWayPointRemoved,
  directionWayPointInsertAt,
  directionWayPointPropertiesChanged,
} = directionSlice.actions;

export const directionWayPointsListenerMiddleware = createListenerMiddleware();

directionWayPointsListenerMiddleware.startListening({
  matcher: isAnyOf(
    directionWayPointChanged,
    directionWayPointsSorted,
    directionWayPointRemoved,
    directionWayPointInsertAt,
  ),
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { wayPoints } = state.direction;
    const validWayPoints = filterDataFeatures(wayPoints);
    if (validWayPoints.length >= 2) {
      const newHash = hashRoute(validWayPoints, {
        optimization: "recommended",
        constraints: {
          avoidHighways: false,
          avoidTollways: false,
          avoidBorders: false,
        },
        profile: "car",
      });
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
  const validWayPoints = filterDataFeatures(state.direction.wayPoints);

  return await orsRoute(validWayPoints, {
    optimization: "recommended",
    profile: "car",
    constraints: {},
  });
});

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
