import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { errorCatcherMiddleware, notificationSlice } from "pentatrion-design/redux";
import { ViewStateListenerMiddleware } from "./stateStorage";
import mapSlice from "./mapSlice";

import searchSlice, { searchFeatureListenerMiddleware } from "~/features/search/searchSlice";
import directionSlice, {
  directionWayPointListenerMiddleware,
  directionWayPointsListenerMiddleware,
} from "~/features/direction/directionSlice";
import layerSlice from "~/features/layer/layerSlice";
import streetViewSlice from "~/features/street-view/streetViewSlice";
import geolocationSlice from "~/features/geolocation/geolocationSlice";
import isochroneSlice from "~/features/isochrone/isochroneSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    map: mapSlice,
    layer: layerSlice,
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
      .prepend(ViewStateListenerMiddleware.middleware)
      .concat(errorCatcherMiddleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
