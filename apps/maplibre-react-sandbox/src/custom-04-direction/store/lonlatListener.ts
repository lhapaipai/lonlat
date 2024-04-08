import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { NoDataFeature } from "pentatrion-design";
import { GeoFeature, resolveLonLatFeaturePoint } from "pentatrion-geo";
import { LocationPayload, directionLocationChanged } from "./directionSlice";
import { SearchPayload, searchFeatureChanged } from "./searchSlice";

export const lonlatFeatureListenerMiddleware = createListenerMiddleware();

lonlatFeatureListenerMiddleware.startListening({
  matcher: isAnyOf(searchFeatureChanged, directionLocationChanged),
  effect: async ({ type, payload: unknownPayload }, { dispatch }) => {
    let feature: GeoFeature | NoDataFeature | null;
    let payload: SearchPayload | LocationPayload;

    if (type === searchFeatureChanged.type) {
      payload = unknownPayload as SearchPayload;
      feature = payload;
    } else if (type === directionLocationChanged.type) {
      payload = unknownPayload as LocationPayload;
      feature = payload.feature;

      if (feature.type === "nodata") {
        return;
      }
    } else {
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
            feature: reversedFeature as GeoFeature,
          }),
        );
      }
    }
  },
});
