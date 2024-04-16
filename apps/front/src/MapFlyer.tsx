import { useEffect } from "react";
import { useAppSelector } from "./store";
import { selectSearchFeature } from "./search/searchSlice";
import { selectTab } from "./store/mapSlice";
import { selectValidDirectionWayPoints } from "./direction/directionSlice";
import { boundsContained, getBounds } from "pentatrion-geo";
import { useMap } from "maplibre-react-components";

export default function MapFlyer() {
  const map = useMap();

  const searchFeature = useAppSelector(selectSearchFeature);
  const tab = useAppSelector(selectTab);
  const validWayPoints = useAppSelector(selectValidDirectionWayPoints);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (searchFeature && tab === "search") {
      const [lon, lat] = searchFeature.geometry.coordinates;
      const contains = map.getBounds().contains([lon, lat]);

      if (!contains) {
        map.flyTo({ center: [lon, lat] });
      }
      return;
    }

    if (tab === "direction") {
      switch (validWayPoints.length) {
        case 0:
          return;
        case 1: {
          const [lon, lat] = validWayPoints[0].geometry.coordinates;
          const contains = map.getBounds().contains([lon, lat]);

          if (!contains) {
            map.flyTo({ center: [lon, lat] });
          }
          return;
        }
        default: {
          const wayPointsBounds = getBounds(validWayPoints.map((p) => p.geometry.coordinates));
          const contains = boundsContained(map.getBounds(), wayPointsBounds);

          if (!contains) {
            map.fitBounds(wayPointsBounds, { padding: 75 });
          }
          return;
        }
      }
    }
  }, [searchFeature, map, tab, validWayPoints]);

  return null;
}
