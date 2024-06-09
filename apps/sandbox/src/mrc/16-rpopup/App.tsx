import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { RMap, RMarker, RPopup } from "maplibre-react-components";
import { useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };
const marignier2 = { lng: 6.2, lat: 46.089 };

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      {showMap && (
        <RMap ref={mapRef} initialCenter={marignier} initialZoom={8}>
          <RMarker longitude={marignier.lng} latitude={marignier.lat} />
          {showPopup && (
            <RPopup
              onMapMove={() => {
                console.log("onMapMove");
                setShowPopup(false);
              }}
              onMapClick={() => {
                setShowPopup(false);
              }}
              longitude={marignier2.lng}
              latitude={marignier2.lat}
            >
              Hello world !
            </RPopup>
          )}
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
        <div>
          <label>
            afficher popup
            <input type="checkbox" onChange={() => setShowPopup((s) => !s)} checked={showPopup} />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
