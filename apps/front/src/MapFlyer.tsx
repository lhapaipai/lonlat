import { useEffect } from "react";
import { useAppSelector } from "./store";
import { selectSearchFeature } from "./search/searchSlice";
import { selectTab } from "./store/mapSlice";
import { selectValidDirectionWayPoints } from "./direction/directionSlice";
import { boundsContained, getBounds } from "pentatrion-geo";
import { useMap } from "maplibre-react-components";
import { selectBaseLayer } from "./layer/layerSlice";
import { BaseLayers, countryBBoxes, layerCountry } from "./layer/layers";
import booleanContains from "@turf/boolean-contains";
import { point } from "@turf/helpers";

export default function MapFlyer() {
  const map = useMap();

  const searchFeature = useAppSelector(selectSearchFeature);
  const tab = useAppSelector(selectTab);
  const validWayPoints = useAppSelector(selectValidDirectionWayPoints);
  const baseLayer = useAppSelector(selectBaseLayer);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (searchFeature && searchFeature.type !== "geolocation" && tab === "search") {
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

  useEffect(() => {
    const countryId = layerCountry[baseLayer] as keyof BaseLayers;
    if (countryId === "world") {
      return;
    }
    const countryInfos = countryBBoxes[countryId];
    const mapCenter = point(map.getCenter().toArray());
    if (!booleanContains(countryInfos.polygon, mapCenter)) {
      map.fitBounds(countryInfos.bbox);
    }
  }, [baseLayer, map]);

  return null;
}
