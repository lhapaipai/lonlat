import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import searchSlice, { searchFeatureListenerMiddleware } from "../search/searchSlice";
import mapSlice from "./mapSlice";
import directionSlice, {
  directionWayPointListenerMiddleware,
  directionWayPointsListenerMiddleware,
} from "../direction/directionSlice";
import geolocationSlice from "../geolocation/geolocationSlice";

import { errorCatcherMiddleware, notificationSlice } from "pentatrion-design/redux";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    map: mapSlice,
    search: searchSlice,
    direction: directionSlice,
    geolocation: geolocationSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(directionWayPointsListenerMiddleware.middleware)
      .prepend(directionWayPointListenerMiddleware.middleware)
      .prepend(searchFeatureListenerMiddleware.middleware)
      .concat(errorCatcherMiddleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
