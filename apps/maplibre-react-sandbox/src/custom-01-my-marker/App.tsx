import "maplibre-gl/dist/maplibre-gl.css";
import { RMap } from "maplibre-react-components";
import { RLLMarker } from "pentatrion-geo";
import "./App.scss";

const marignier = { lng: 6.498, lat: 46.089 };
const marignierChurch = { lng: 6.5001, lat: 46.091 };

function App() {
  return (
    <>
      <RMap
        initialCenter={marignier}
        initialZoom={14}
        mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"
      >
        <RLLMarker longitude={marignierChurch.lng} latitude={marignierChurch.lat} />
      </RMap>
    </>
  );
}

export default App;
