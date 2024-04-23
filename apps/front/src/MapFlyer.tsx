import { useEffect } from "react";
import { useAppSelector } from "./store";
import { selectSearchFeature } from "./search/searchSlice";
import { selectTab } from "./store/mapSlice";
import { selectValidDirectionWayPoints } from "./direction/directionSlice";
import { GeoPointOption, boundsContained, getBounds } from "pentatrion-geo";
import { useMap } from "maplibre-react-components";
import { selectBaseLayer } from "./layer/layerSlice";
import { BaseLayers, countryBBoxes, layerCountry } from "./layer/layers";
import booleanContains from "@turf/boolean-contains";
import { point } from "@turf/helpers";
import { selectGeolocation } from "./geolocation/geolocationSlice";
import { GeolocationOption } from "pentatrion-design";
import { Position } from "geojson";
import { isNotNull } from "./lib/util";

export default function MapFlyer() {
  const map = useMap();

  const geolocation = useAppSelector(selectGeolocation);
  const { lockCamera, coords: geolocationCoords, enabled: geolocationEnabled } = geolocation;

  const searchFeature = useAppSelector(selectSearchFeature);
  const tab = useAppSelector(selectTab);
  const validWayPoints = useAppSelector(selectValidDirectionWayPoints);
  const baseLayer = useAppSelector(selectBaseLayer);

  useEffect(() => {
    if (!map) {
      return;
    }

    const hasGeolocationFeature =
      searchFeature?.type === "geolocation" ||
      validWayPoints.some((wayPoint) => wayPoint.type === "geolocation");

    if (geolocationEnabled && hasGeolocationFeature) {
      if (geolocationCoords && lockCamera && !map.getBounds().contains(geolocationCoords)) {
        map.flyTo({ center: geolocationCoords });
      }
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
          const wayPoint: GeoPointOption | GeolocationOption = validWayPoints[0];
          // TODO est-ce utile de vérifier la géolocalisation car on a un return au-dessus.
          const coords: Position | null =
            wayPoint.type === "geolocation" ? geolocationCoords : wayPoint.geometry.coordinates;

          if (!coords) {
            return;
          }

          const [lon, lat] = coords;

          const contains = map.getBounds().contains([lon, lat]);

          if (!contains) {
            map.flyTo({ center: [lon, lat] });
          }
          return;
        }
        default: {
          const wayPointsBounds = getBounds(
            validWayPoints
              .map((p) => (p.type === "geolocation" ? geolocationCoords : p.geometry.coordinates))
              .filter(isNotNull),
          );
          const contains = boundsContained(map.getBounds(), wayPointsBounds);

          if (!contains) {
            map.fitBounds(wayPointsBounds, { padding: 75 });
          }
          return;
        }
      }
    }
  }, [searchFeature, map, tab, validWayPoints, geolocationEnabled, geolocationCoords, lockCamera]);

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
