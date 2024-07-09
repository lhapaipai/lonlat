import { baseLayerChanged, viewStateChanged } from "~/features/map/mapSlice";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from ".";
import { customReplaceState } from "~/lib/util";
import { getHashString } from "~/lib/hash";
import { readOnlyChanged } from "./configSlice";

export const ViewStateListenerMiddleware = createListenerMiddleware();
ViewStateListenerMiddleware.startListening({
  matcher: isAnyOf(viewStateChanged, baseLayerChanged, readOnlyChanged),
  effect: async (_, { getState }) => {
    const state = getState() as RootState;

    const mapState = state.map;
    const searchState = state.search;
    const directionState = state.direction;
    const configState = state.config;
    const hash = getHashString(
      mapState,
      searchState,
      directionState,
      configState,
    );

    const location = window.location.href.replace(/(#.+)?$/, hash);
    customReplaceState(window.history.state, "", location);
  },
});
