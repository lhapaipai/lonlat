import {
  RAttributionControl,
  RFullscreenControl,
  RGeolocateControl,
  RLogoControl,
  RMap,
  RNavigationControl,
  RScaleControl,
} from "maplibre-react-components";

const home = { lng: 6, lat: 46 };

export default function App() {
  return (
    <RMap
      initialCenter={home}
      cooperativeGestures={true}
      style={{ width: "100%", height: 400 }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    >
      <RAttributionControl />
      <RFullscreenControl />
      <RGeolocateControl />
      <RLogoControl />
      <RNavigationControl />
      <RScaleControl />
    </RMap>
  );
}
