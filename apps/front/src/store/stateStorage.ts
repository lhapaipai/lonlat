import { baseLayerChanged } from "~/features/layer/layerSlice";
import { viewStateChanged } from "./mapSlice";
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

    const baseLayer = state.layer.baseLayer;
    const viewState = state.map.viewState;
    const searchState = state.search;
    const directionState = state.direction;
    const hash = getHashString(
      baseLayer,
      viewState,
      searchState,
      directionState,
    );
    const location = window.location.href.replace(/(#.+)?$/, hash);
    customReplaceState(window.history.state, "", location);
  },
});
