import { GeolocateControl, Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-react-components/dist/maplibre-mrc.css";
import { RMap, RMarker } from "maplibre-react-components";
import { useRef, useState } from "react";
import { ignPlanStyleUrl } from "~/shared/constants";

const marignier = { lng: 6.498, lat: 46.089 };

function onMounted(map: Map) {
  const ctrl = new GeolocateControl({
    showUserLocation: true,
  });
  map.addControl(ctrl);
}

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);

  function handleGeolocate() {}

  return (
    <>
      <RMap
        ref={mapRef}
        initialCenter={marignier}
        initialZoom={8}
        onMounted={onMounted}
        mapStyle={ignPlanStyleUrl}
      >
        <RMarker longitude={marignier.lng} latitude={marignier.lat} />
      </RMap>
      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>info</button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>
            counter {counter}
          </button>
        </div>
        <div>
          <button onClick={handleGeolocate}>Geolocate</button>
        </div>
      </div>
    </>
  );
}

export default App;
