import { memo, useEffect } from "react";
import { useAppSelector } from "./store";
import { selectSearchFeature } from "~/features/search/searchSlice";
import { selectTab } from "~/features/config/configSlice";
import { selectValidDirectionWayPoints } from "~/features/direction/directionSlice";
import { GeoPointOption } from "pentatrion-geo/types";
import { getBounds } from "pentatrion-geo/geo-options/geometry";
import { isGeolocationGeoOption } from "pentatrion-geo/geo-options/geolocation";

import { useMap } from "maplibre-react-components";
import { selectBaseLayer } from "~/features/map/mapSlice";
import { BaseLayers, countryBBoxes, layerCountry } from "~/features/map/layers";
import booleanContains from "@turf/boolean-contains";
import { point } from "@turf/helpers";
import { selectGeolocation } from "~/features/geolocation/geolocationSlice";
import { LngLat, LngLatBounds } from "maplibre-gl";

function MapFlyer() {
  const map = useMap();

  const geolocation = useAppSelector(selectGeolocation);
  const {
    lockCamera,
    coords: geolocationCoords,
    status: geolocationStatus,
    accuracy,
  } = geolocation;
  const geolocationEnabled = geolocationStatus === "on";

  const searchFeature = useAppSelector(selectSearchFeature);
  const tab = useAppSelector(selectTab);
  const validWayPoints = useAppSelector(selectValidDirectionWayPoints);
  const baseLayer = useAppSelector(selectBaseLayer);

  useEffect(() => {
    if (!map) {
      return;
    }

    const hasGeolocationFeature =
      (searchFeature && isGeolocationGeoOption(searchFeature)) ||
      validWayPoints.some(isGeolocationGeoOption);

    if (hasGeolocationFeature) {
      if (
        geolocationEnabled &&
        geolocationCoords &&
        lockCamera &&
        (!map.getBounds().contains(geolocationCoords) || map.getZoom() < 15)
      ) {
        if (!accuracy) {
          map.flyTo({
            center: geolocationCoords,
            zoom: Math.max(15, map.getZoom()),
          });
        } else {
          const newBounds = LngLatBounds.fromLngLat(
            LngLat.convert(geolocationCoords),
            accuracy,
          );
          map.fitBounds(newBounds, {
            maxZoom: 15,
          });
        }
      }
      return;
    }

    /**
     * from now, we know that neither searchFeature nor directionWaypoints
     * are GeolocationGeoOption
     */

    if (searchFeature && tab === "search") {
      const [lon, lat] = searchFeature.geometry.coordinates;
      const contains = map.getBounds().contains([lon, lat]);

      if (!contains || map.getZoom() < 10) {
        map.flyTo({ center: [lon, lat], zoom: Math.max(15, map.getZoom()) });
      }
      return;
    }

    if (tab === "direction") {
      switch (validWayPoints.length) {
        case 0:
          return;
        case 1: {
          const wayPoint: GeoPointOption = validWayPoints[0];
          const coords = wayPoint.geometry.coordinates;

          if (!coords) {
            return;
          }

          const [lon, lat] = coords;

          const contains = map.getBounds().contains([lon, lat]);

          if (!contains) {
            /**
             * we move while keeping exactly the same zoom level.
             */
            map.flyTo({ center: [lon, lat] });
          }
          return;
        }
        default: {
          const wayPointsBounds = getBounds(
            validWayPoints.map((p) => p.geometry.coordinates),
          );

          const mapBounds = map.getBounds();
          const atLeastOne = validWayPoints.some((wayPoint) =>
            mapBounds.contains(
              wayPoint.geometry.coordinates as [number, number],
            ),
          );

          if (!atLeastOne) {
            map.fitBounds(wayPointsBounds, { padding: 75 });
          }
          return;
        }
      }
    }
  }, [
    searchFeature,
    map,
    tab,
    validWayPoints,
    geolocationEnabled,
    geolocationCoords,
    lockCamera,
    accuracy,
  ]);

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

export default memo(MapFlyer);
