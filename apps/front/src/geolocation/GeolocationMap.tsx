import { RLLMarker } from "pentatrion-geo";
import { selectDirectionWayPoints } from "../direction/directionSlice";
import { selectSearchFeature } from "../search/searchSlice";
import { useAppSelector } from "../store";
import { selectGeolocation } from "./geolocationSlice";
import { RMarker, useMap } from "maplibre-react-components";
import { Map } from "maplibre-gl";
import "./Geolocation.scss";

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
  const {
    showAccuracyCircle,
    accuracy,
    coords: geolocationCoords,
    enabled: geolocationEnabled,
  } = geolocation;

  const searchFeature = useAppSelector(selectSearchFeature);
  const wayPoints = useAppSelector(selectDirectionWayPoints);
  if (!geolocationEnabled || !geolocationCoords) {
    return null;
  }

  const showMarker =
    searchFeature?.type === "geolocation" ||
    wayPoints.some((wayPoint) => wayPoint.type === "geolocation");

  const circleDiameter = getCircleDiameter(map, accuracy);

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
          <div className="content" style={{ width: circleDiameter, height: circleDiameter }}></div>
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
