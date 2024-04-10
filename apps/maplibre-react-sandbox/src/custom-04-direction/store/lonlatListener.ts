import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { resolveLonLatFeaturePoint } from "pentatrion-geo";
import { LocationPayload, directionLocationChanged } from "./directionSlice";
import { SearchPayload, searchFeatureChanged } from "./searchSlice";

export const lonlatFeatureListenerMiddleware = createListenerMiddleware();

function extractFeature(type: string, payload: SearchPayload | LocationPayload) {
  if (type === searchFeatureChanged.type) {
    return payload as SearchPayload;
  } else if (type === directionLocationChanged.type) {
    const locationPayload = payload as LocationPayload;
    return locationPayload.feature.type === "nodata" ? null : locationPayload.feature;
  }

  return null;
}

lonlatFeatureListenerMiddleware.startListening({
  matcher: isAnyOf(searchFeatureChanged, directionLocationChanged),
  effect: async ({ type, payload: unknownPayload }, { dispatch }) => {
    const payload = unknownPayload as SearchPayload | LocationPayload;
    const feature = extractFeature(type, payload);

    if (!feature) {
      return;
    }

    if (feature?.properties.type !== "lonlat" || feature?.properties.score !== 0) {
      return;
    }

    const reversedFeature = await resolveLonLatFeaturePoint(feature);

    if (reversedFeature.properties.type !== "lonlat") {
      if (type === searchFeatureChanged.type) {
        dispatch(searchFeatureChanged(reversedFeature));
      } else if (type === directionLocationChanged.type) {
        dispatch(
          directionLocationChanged({
            index: (payload as LocationPayload).index,
            feature: reversedFeature,
          }),
        );
      }
    }
  },
});
