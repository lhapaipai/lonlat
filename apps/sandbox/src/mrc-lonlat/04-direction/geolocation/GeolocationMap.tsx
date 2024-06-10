import { RMarker } from "pentatrion-geo";
import { selectDirectionWayPoints } from "../direction/directionSlice";
import { selectSearchFeature } from "../search/searchSlice";
import { useAppSelector } from "../store";
import { selectGeolocationCoords } from "./geolocationSlice";

export default function GeolocationMap() {
  const geolocationCoords = useAppSelector(selectGeolocationCoords);
  const searchFeature = useAppSelector(selectSearchFeature);
  const wayPoints = useAppSelector(selectDirectionWayPoints);
  if (!geolocationCoords) {
    return null;
  }

  const showMarker =
    searchFeature?.type === "geolocation" ||
    wayPoints.some((wayPoint) => wayPoint.type === "geolocation");

  return (
    showMarker && (
      <>
        <RMarker
          className="geolocation"
          icon="fe-locate"
          key="geolocation"
          longitude={geolocationCoords[0]}
          latitude={geolocationCoords[1]}
        />
      </>
    )
  );
}
