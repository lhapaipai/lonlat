import "maplibre-gl/dist/maplibre-gl.css";
import { RMap, RMarker } from "maplibre-react-components";
import "./App.scss";

const marignier = { lng: 6.498, lat: 46.089 };
const marignierChurch = { lng: 6.5001, lat: 46.091 };

function App() {
  return (
    <>
      <RMap
        initialCenter={marignier}
        initialZoom={14}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
      >
        <RMarker longitude={marignierChurch.lng} latitude={marignierChurch.lat}></RMarker>
      </RMap>
    </>
  );
}

export default App;
