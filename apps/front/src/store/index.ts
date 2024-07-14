import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import {
  errorCatcherMiddleware,
  notificationSlice,
} from "pentatrion-design/redux";
import { ViewStateListenerMiddleware } from "./stateStorage";
import configSlice, { modeChangedAction } from "~/features/config/configSlice";
import searchSlice, {
  searchFeatureListenerMiddleware,
} from "~/features/search/searchSlice";
import directionSlice, {
  directionRouteListenerMiddleware,
  directionWayPointListenerMiddleware,
  directionWayPointsListenerMiddleware,
  fetchRoute,
} from "~/features/direction/directionSlice";
import mapSlice from "~/features/map/mapSlice";
import streetViewSlice from "~/features/street-view/streetViewSlice";
import geolocationSlice from "~/features/geolocation/geolocationSlice";
import isochroneSlice from "~/features/isochrone/isochroneSlice";
import { parseHashString } from "./hash";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    map: mapSlice,
    config: configSlice,
    search: searchSlice,
    direction: directionSlice,
    streetView: streetViewSlice,
    geolocation: geolocationSlice,
    isochrone: isochroneSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(searchFeatureListenerMiddleware.middleware)
      .prepend(directionWayPointListenerMiddleware.middleware)
      .prepend(directionWayPointsListenerMiddleware.middleware)
      .prepend(directionRouteListenerMiddleware.middleware)
      .prepend(ViewStateListenerMiddleware.middleware)
      .concat(errorCatcherMiddleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const mode = e.matches ? "dark" : "light";
    store.dispatch(modeChangedAction(mode));
  });

const hashInfos = parseHashString(window.location.hash);

if (hashInfos?.direction) {
  store.dispatch(fetchRoute());
}
