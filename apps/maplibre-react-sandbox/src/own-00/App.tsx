import { Map, Marker } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { RMap, RMarker } from "maplibre-react-components";
import { useRef, useState } from "react";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"

const marignier = { lng: 6.498, lat: 46.089 };

function App() {
  const mapRef = useRef<RMap>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);

  return (
    <>
      {showMap && (
        <RMap ref={mapRef} initialCenter={marignier} initialZoom={8}>
          <RMarker longitude={marignier.lng} latitude={marignier.lat} />
        </RMap>
      )}
      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>info</button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>counter {counter}</button>
        </div>
        <div>
          <button onClick={() => setShowMap((s) => !s)}>{showMap ? "masquer" : "afficher"}</button>
        </div>
      </div>
    </>
  );
}

export default App;
