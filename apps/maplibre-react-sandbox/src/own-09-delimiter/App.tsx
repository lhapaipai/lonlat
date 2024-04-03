import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { RMap, RMarker } from "maplibre-react-components";
import { useRef, useState } from "react";
import { ResizeArea } from "pentatrion-design";

const marignier = { lng: 6.498, lat: 46.089 };

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);

  return (
    <>
      <div className="map-container">
        {showMap && (
          <RMap ref={mapRef} initialCenter={marignier} initialZoom={8}>
            <RMarker longitude={marignier.lng} latitude={marignier.lat} />
            <div className="sidebar">
              <div>
                <button onClick={() => console.log(mapRef)}>info</button>
              </div>
              <div>
                <button onClick={() => setCounter((c) => c + 1)}>counter {counter}</button>
              </div>
              <div>
                <button onClick={() => setShowMap((s) => !s)}>
                  {showMap ? "masquer" : "afficher"}
                </button>
              </div>
            </div>
          </RMap>
        )}
      </div>
      <div className="context-row">
        <ResizeArea name="extra" position="top" />
        <p>Hello world</p>
      </div>
    </>
  );
}

export default App;
