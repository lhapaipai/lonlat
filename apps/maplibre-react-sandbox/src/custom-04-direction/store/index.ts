import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import mapSlice from "./mapSlice";
import directionSlice, { directionLocationsListenerMiddleware } from "./directionSlice";

const store = configureStore({
  reducer: {
    map: mapSlice,
    search: searchSlice,
    direction: directionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(directionLocationsListenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
