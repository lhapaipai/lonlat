import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../search/searchSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import mapSlice from "./mapSlice";
import directionSlice, { directionLocationsListenerMiddleware } from "../direction/directionSlice";
import { lonlatFeatureListenerMiddleware } from "./lonlatListener";
import { errorCatcherMiddleware, notificationSlice } from "pentatrion-design/redux";
import layerSlice from "../layer/layerSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    map: mapSlice,
    layer: layerSlice,
    search: searchSlice,
    direction: directionSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(lonlatFeatureListenerMiddleware.middleware)
      .prepend(directionLocationsListenerMiddleware.middleware)
      .concat(errorCatcherMiddleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
