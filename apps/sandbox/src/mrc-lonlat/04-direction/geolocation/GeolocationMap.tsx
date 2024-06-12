import { isGeolocationGeoOption } from "pentatrion-geo";
import { selectValidDirectionWayPoints } from "../direction/directionSlice";
import { selectSearchFeature } from "../search/searchSlice";
import { useAppSelector } from "../store";
import { selectGeolocationCoords } from "./geolocationSlice";
import { RGradientMarker } from "maplibre-react-components";

export default function GeolocationMap() {
  const geolocationCoords = useAppSelector(selectGeolocationCoords);
  const searchFeature = useAppSelector(selectSearchFeature);
  const validWayPoints = useAppSelector(selectValidDirectionWayPoints);
  if (!geolocationCoords) {
    return null;
  }

  const showMarker =
    (searchFeature && isGeolocationGeoOption(searchFeature)) ||
    validWayPoints.some(isGeolocationGeoOption);

  return (
    showMarker && (
      <>
        <RGradientMarker
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
