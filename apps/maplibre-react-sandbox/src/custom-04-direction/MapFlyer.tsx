import { useEffect } from "react";
import { useAppSelector } from "./store";
import { selectSearchFeature } from "./store/searchSlice";
import { selectTab } from "./store/mapSlice";
import { selectValidDirectionLocations } from "./store/directionSlice";
import { boundsContained, getBounds } from "pentatrion-geo";
import { useMap } from "maplibre-react-components";

export default function MapFlyer() {
  const map = useMap();

  const searchFeature = useAppSelector(selectSearchFeature);
  const tab = useAppSelector(selectTab);
  const validLocations = useAppSelector(selectValidDirectionLocations);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (searchFeature && tab === "search") {
      const center = searchFeature.geometry.coordinates;
      const contains = map.getBounds().contains(center);

      if (!contains) {
        map.flyTo({ center });
      }
      return;
    }

    if (tab === "direction") {
      switch (validLocations.length) {
        case 0:
          return;
        case 1: {
          const center = validLocations[0].geometry.coordinates;
          const contains = map.getBounds().contains(center);

          if (!contains) {
            map.flyTo({ center });
          }
          return;
        }
        default: {
          const locationsBounds = getBounds(validLocations.map((p) => p.geometry.coordinates));
          const contains = boundsContained(map.getBounds(), locationsBounds);

          if (!contains) {
            map.fitBounds(locationsBounds, { padding: 75 });
          }
          return;
        }
      }
    }
  }, [searchFeature, map, tab, validLocations]);

  return null;
}
