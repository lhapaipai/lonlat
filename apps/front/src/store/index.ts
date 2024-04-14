import { configureStore } from "@reduxjs/toolkit";
import searchSlice, { searchFeatureListenerMiddleware } from "../search/searchSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import mapSlice from "./mapSlice";
import directionSlice, {
  directionLocationListenerMiddleware,
  directionLocationsListenerMiddleware,
} from "../direction/directionSlice";
import { errorCatcherMiddleware, notificationSlice } from "pentatrion-design/redux";
import layerSlice from "../layer/layerSlice";
import streetViewSlice from "../street-view/streetViewSlice";

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    map: mapSlice,
    layer: layerSlice,
    search: searchSlice,
    direction: directionSlice,
    streetView: streetViewSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(searchFeatureListenerMiddleware.middleware)
      .prepend(directionLocationListenerMiddleware.middleware)
      .prepend(directionLocationsListenerMiddleware.middleware)
      .concat(errorCatcherMiddleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
