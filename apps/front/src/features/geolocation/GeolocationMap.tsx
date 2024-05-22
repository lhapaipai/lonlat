import { RLLMarker, isGeolocationGeoOption } from "pentatrion-geo";
import { selectValidDirectionWayPoints } from "~/features/direction/directionSlice";
import { selectSearchFeature } from "~/features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "~/store";
import { activationChanged, selectGeolocation } from "./geolocationSlice";
import { RMarker, useMap } from "maplibre-react-components";
import { Map } from "maplibre-gl";
import { useEffect } from "react";

function getCircleDiameter(map: Map, accuracy: number | null) {
  if (!accuracy) {
    return null;
  }
  const bounds = map.getBounds();
  const southEastPoint = bounds.getSouthEast();
  const northEastPoint = bounds.getNorthEast();
  const mapHeightInMeters = southEastPoint.distanceTo(northEastPoint);
  const mapHeightInPixels = map._container.clientHeight;
  const circleDiameter = Math.ceil(2 * (accuracy / (mapHeightInMeters / mapHeightInPixels)));
  return circleDiameter;
}

export default function GeolocationMap() {
  const map = useMap();
  const geolocation = useAppSelector(selectGeolocation);
  const dispatch = useAppDispatch();

  const {
    showAccuracyCircle,
    accuracy,
    coords: geolocationCoords,
    status: geolocationStatus,
  } = geolocation;

  const searchFeature = useAppSelector(selectSearchFeature);
  const validWayPoints = useAppSelector(selectValidDirectionWayPoints);

  const showMarker =
    (searchFeature && isGeolocationGeoOption(searchFeature)) ||
    validWayPoints.some(isGeolocationGeoOption);

  const circleDiameter = getCircleDiameter(map, accuracy);

  useEffect(() => {
    if (!showMarker) {
      dispatch(activationChanged(false));
    }
  }, [showMarker, dispatch]);

  if (geolocationStatus !== "on" || !geolocationCoords) {
    return null;
  }

  return (
    <>
      {showMarker && showAccuracyCircle && circleDiameter && (
        <RMarker
          key="geolocation-accuracy"
          longitude={geolocationCoords[0]}
          latitude={geolocationCoords[1]}
          pitchAlignment="map"
          className="geolocation-accuracy"
          opacity="0.2"
        >
          <div
            className="rounded-full bg-yellow-1 border-4 border-gray-6"
            style={{ width: circleDiameter, height: circleDiameter }}
          ></div>
        </RMarker>
      )}
      {showMarker && (
        <RLLMarker
          className="geolocation"
          icon="fe-geolocation"
          key="geolocation"
          longitude={geolocationCoords[0]}
          latitude={geolocationCoords[1]}
        />
      )}
    </>
  );
}
