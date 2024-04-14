import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { getFeaturePointAltitude, reverseGeocodeLonLatFeaturePoint } from "pentatrion-geo";
import {
  LocationPayload,
  directionLocationChanged,
  directionLocationPropertiesChanged,
} from "../direction/directionSlice";
import {
  SearchPayload,
  searchFeatureChanged,
  searchFeatureGeometryChanged,
  searchFeaturePropertiesChanged,
} from "../search/searchSlice";
import { messageAdded } from "pentatrion-design/redux";
import { parseError } from "pentatrion-design";

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

    reverseGeocodeLonLatFeaturePoint(feature)
      .then((accurateProperties) => {
        if (accurateProperties && accurateProperties.type !== "lonlat") {
          if (type === searchFeatureChanged.type) {
            dispatch(searchFeaturePropertiesChanged(accurateProperties));
          } else if (type === directionLocationChanged.type) {
            dispatch(
              directionLocationPropertiesChanged({
                index: (payload as LocationPayload).index,
                properties: accurateProperties,
              }),
            );
          }
        }
      })
      .catch((err) => {
        const errorMessage = parseError(err);
        if (errorMessage) {
          dispatch(messageAdded(...errorMessage));
        } else {
          throw err;
        }
      });

    if (type === searchFeatureChanged.type) {
      getFeaturePointAltitude(feature)
        .then((geometryWithAltitude) => {
          if (geometryWithAltitude) {
            dispatch(searchFeatureGeometryChanged(geometryWithAltitude));
          }
        })
        .catch((err) => {
          const errorMessage = parseError(err);
          if (errorMessage) {
            dispatch(messageAdded(...errorMessage));
          } else {
            throw err;
          }
        });
    }
  },
});
