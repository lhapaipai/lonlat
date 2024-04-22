import { baseLayerChanged } from "~/layer/layerSlice";
import { viewStateChanged } from "./mapSlice";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getHashString } from "~/lib/hashUtil";

export const ViewStateListenerMiddleware = createListenerMiddleware();
ViewStateListenerMiddleware.startListening({
  matcher: isAnyOf(viewStateChanged, baseLayerChanged),
  effect: async (_, { getState }) => {
    const state = getState() as RootState;

    const baseLayer = state.layer.baseLayer;
    const viewState = state.map.viewState;

    const hash = getHashString(baseLayer, viewState);

    const location = window.location.href.replace(/(#.+)?$/, hash);
    try {
      window.history.replaceState(window.history.state, "", location);
    } catch (SecurityError) {
      // IE11 does not allow this if the page is within an iframe created
      // with iframe.contentWindow.document.write(...).
      // https://github.com/mapbox/mapbox-gl-js/issues/7410
    }
  },
});
