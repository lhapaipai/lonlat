import { baseLayerChanged } from "~/features/layer/layerSlice";
import { viewStateChanged } from "./mapSlice";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getHashString } from "~/lib/hashUtil";
import { searchReadOnlyChanged } from "~/features/search/searchSlice";
import { customReplaceState } from "~/lib/util";

export const ViewStateListenerMiddleware = createListenerMiddleware();
ViewStateListenerMiddleware.startListening({
  matcher: isAnyOf(viewStateChanged, baseLayerChanged, searchReadOnlyChanged),
  effect: async (_, { getState }) => {
    const state = getState() as RootState;

    const baseLayer = state.layer.baseLayer;
    const viewState = state.map.viewState;
    const searchState = state.search;
    const hash = getHashString(baseLayer, viewState, searchState);
    const location = window.location.href.replace(/(#.+)?$/, hash);
    customReplaceState(window.history.state, "", location);
  },
});
