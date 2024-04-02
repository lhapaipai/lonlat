import { useState } from "react";
import "./App.scss";

import { RMap, RMarker } from "maplibre-react-components";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const [show, setShow] = useState(true);
  const [coords, setCoords] = useState({
    lng: 5,
    lat: 45,
  });

  function handleChangeMarkerCoords() {
    setCoords({ lng: Math.random() * 300 - 150, lat: Math.random() * 150 - 75 });
  }

  return (
    <>
      <div className="sidebar">
        <button onClick={() => setShow((show) => !show)}>toggle map</button>
        <button onClick={handleChangeMarkerCoords}>change marker cords</button>
      </div>
      {show && (
        <RMap>
          <RMarker longitude={coords.lng} latitude={coords.lat}></RMarker>
        </RMap>
      )}
    </>
  );
}

export default App;
