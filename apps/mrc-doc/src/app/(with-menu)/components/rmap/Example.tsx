import {
  MrcLogoControl,
  RAttributionControl,
  RFullscreenControl,
  RGeolocateControl,
  RMap,
  RNavigationControl,
} from "maplibre-react-components";

const home = { lng: 6, lat: 46 };

export default function App() {
  return (
    <>
      <RMap
        initialCenter={home}
        cooperativeGestures={true}
        style={{ height: 400 }}
        mapStyle="https://demotiles.maplibre.org/style.json"
      >
        <RAttributionControl />
        <RFullscreenControl />
        <RGeolocateControl />
        <RNavigationControl />
        <MrcLogoControl />
      </RMap>
    </>
  );
}
