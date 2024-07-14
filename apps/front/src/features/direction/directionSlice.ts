import { orsRoute, fetchOverpassPois } from "pentatrion-geo/api";
import {
  createNodataFeature,
  filterDataFeatures,
  reverseGeocodeLonLatFeaturePoint,
  hashRoute,
} from "pentatrion-geo/geo-options";
import {
  GeoPointOption,
  RouteFeatureResponse,
  FeatureProperties,
  DirectionOptions,
  PoiFeatureCollectionResponse,
} from "pentatrion-geo/types";
import {
  createAsyncThunk,
  createListenerMiddleware,
  createSelector,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "~/store";
import { NoDataOption } from "pentatrion-design";
import { errorAdded } from "pentatrion-design/redux";
import { FeatureCollection, LineString, Point, Position } from "geojson";
import {
  openRouteServiceToken,
  openRouteServiceUrl,
  overpassUrl,
} from "~/config/constants";
import { parseHashString } from "~/store/hash";
import { lineString, point } from "@turf/helpers";
// import { tabChanged } from "~/features/config/configSlice";

type WayPoint = GeoPointOption | NoDataOption;

export type DirectionState = {
  showElevationProfile: boolean;
  pois: PoiFeatureCollectionResponse | null;
  focusCoordinates: Position | null;
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

const hashInfos = parseHashString(window.location.hash);

const initialState: DirectionState = hashInfos?.direction
  ? hashInfos.direction
  : {
      showElevationProfile: false,
      pois: null,
      focusCoordinates: null,
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
    directionFocusCoordinatesChanged(
      state,
      action: PayloadAction<Position | null>,
    ) {
      state.focusCoordinates = action.payload;
    },
    directionShowElevationProfileChanged(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.showElevationProfile = action.payload;
    },
    directionPoisChanged(
      state,
      action: PayloadAction<PoiFeatureCollectionResponse | null>,
    ) {
      state.pois = action.payload;
    },
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
    optimizationChanged(
      state,
      action: PayloadAction<DirectionOptions["optimization"]>,
    ) {
      state.optimization = action.payload;
    },
    profileChanged(state, action: PayloadAction<DirectionOptions["profile"]>) {
      state.profile = action.payload;
    },
    constraintChanged(
      state,
      action: PayloadAction<{
        key: keyof DirectionState["constraints"];
        value: boolean;
      }>,
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
      if (
        state.wayPoints[index] === undefined ||
        state.wayPoints[index].type === "nodata"
      ) {
        throw new Error("direction wayPoint index invalid");
      }
      (state.wayPoints[index] as GeoPointOption).properties = properties;
    },
    directionWayPointRemoved(state, action: PayloadAction<number>) {
      state.wayPoints = state.wayPoints.filter(
        (_, idx) => idx !== action.payload,
      );
    },
    directionWayPointInsertAt(state, action: PayloadAction<WayPointPayload>) {
      const { feature, index } = action.payload;
      state.wayPoints.splice(index, 0, feature);
    },
    directionRouteChanged(
      state,
      action: PayloadAction<RouteFeatureResponse | null>,
    ) {
      state.route = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRoute.fulfilled, (state, action) => {
        if (action.payload) {
          state.route = action.payload;
        } else if (action.payload === null) {
          // fetchRoute has been called but the route is dirty, we need to
          // remove
          state.route = null;
        } else {
          // fetchRoute has been called while the parameters have not
          // changed, the route must not be removed
        }
      })
      .addCase(fetchPois.fulfilled, (state, action) => {
        if (action.payload) {
          state.pois = action.payload;
        } else if (action.payload === null) {
          // fetchPois has been called but there is no route already we need to remove
          // out of date pois.
          state.pois = null;
        }
      });
  },
});

export default directionSlice.reducer;

export const {
  directionShowElevationProfileChanged,
  directionPoisChanged,
  directionFocusCoordinatesChanged,
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

export const selectDirectionFocusCoordinates = (state: RootState) =>
  state.direction.focusCoordinates;
export const selectDirectionElevationChart = (state: RootState) =>
  state.direction.showElevationProfile;
export const selectDirectionPois = (state: RootState) => state.direction.pois;
export const selectDirectionProfile = (state: RootState) =>
  state.direction.profile;
export const selectDirectionWayPoints = (state: RootState) =>
  state.direction.wayPoints;
export const selectValidDirectionWayPoints = createSelector(
  selectDirectionWayPoints,
  (wayPoints) => filterDataFeatures(wayPoints),
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
      features: [
        ...route.properties.wayPoints,
        point(route.geometry.coordinates[0]),
        point(
          route.geometry.coordinates[route.geometry.coordinates.length - 1],
        ),
      ],
    };
  },
);

export const selectDirectionApproachWalk = createSelector(
  selectDirectionRoute,
  (route): null | FeatureCollection<LineString> => {
    if (!route) {
      return null;
    }
    /**
     * wayPoints are already validWaypoints
     */
    const first = route.properties.wayPoints[0];
    const last =
      route.properties.wayPoints[route.properties.wayPoints.length - 1];
    return {
      type: "FeatureCollection",
      features: [
        lineString([first.geometry.coordinates, route.geometry.coordinates[0]]),
        lineString([
          route.geometry.coordinates[route.geometry.coordinates.length - 1],
          last.geometry.coordinates,
        ]),
      ],
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
    // todo why tabChanged ?
    // tabChanged,
  ),
  effect: (_, { dispatch }) => {
    dispatch(fetchRoute());
  },
});

export const fetchRoute = createAsyncThunk(
  "direction/fetchRoute",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { wayPoints, optimization, constraints, profile } = state.direction;
    const validWayPoints = filterDataFeatures(wayPoints);

    if (validWayPoints.length >= 2) {
      const newHash = hashRoute(validWayPoints, {
        optimization,
        constraints,
        profile,
      });
      if (
        !state.direction.route ||
        newHash !== state.direction.route.properties.hash
      ) {
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
      }
      // undefined -> route is always valid we do nothing
      return;
    } else {
      dispatch(directionRouteChanged(null));
      // null -> route is invalided we need to remove
      return null;
    }
  },
);

export const directionRouteListenerMiddleware = createListenerMiddleware();
directionRouteListenerMiddleware.startListening({
  matcher: isAnyOf(
    fetchRoute.fulfilled,
    directionRouteChanged,
    directionShowElevationProfileChanged,
  ),
  effect: (_, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.direction.showElevationProfile) {
      /**
       * user has hidden the chart, points of interest were visible
       * and the route has changed
       * pois are out of date we need to remove them.
       */
      if (
        state.direction.pois &&
        state.direction.route?.properties.hash !==
          state.direction.pois.referenceHash
      ) {
        dispatch(directionPoisChanged(null));
      } else {
        /**
         * the graph is hidden the display of the pois does not require
         * an additional request and they are not expired so we can keep them
         */
      }
      return;
    }
    if (
      state.direction.route &&
      state.direction.pois &&
      state.direction.route.properties.hash ===
        state.direction.pois.referenceHash
    ) {
      console.log("by pass");
      return;
    }

    dispatch(directionPoisChanged(null));

    if (state.direction.route) {
      dispatch(fetchPois());
    }
  },
});

export const fetchPois = createAsyncThunk(
  "direction/fetchPois",
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (!state.direction.route) {
      return null;
    } else {
      return await fetchOverpassPois(state.direction.route, overpassUrl);
    }
  },
);

export const directionWayPointListenerMiddleware = createListenerMiddleware();
directionWayPointListenerMiddleware.startListening({
  actionCreator: directionWayPointChanged,
  effect: async ({ payload: { index, feature } }, { dispatch }) => {
    if (!feature || feature.type === "nodata") {
      return;
    }

    if (
      feature.properties.type === "lonlat" &&
      feature.properties.score === 0
    ) {
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
