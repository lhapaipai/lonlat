import { useState } from "react";
import "./App.scss";

import { RMap } from "maplibre-react-components";
import * as maplibre from "maplibre-gl";

function App() {
  const [show, setShow] = useState(true);
  const [coords, setCoords] = useState<maplibre.LngLatLike>([5, 45]);

  function handleChangeMarkerCoords() {
    setCoords([Math.random() * 300 - 150, Math.random() * 150 - 75]);
  }

  function handleReady(map: maplibre.Map) {
    console.log("map ready", map);
  }

  return (
    <>
      <div className="sidebar">
        <button onClick={() => setShow((show) => !show)}>toggle map</button>
        <button onClick={handleChangeMarkerCoords}>change marker cords</button>
      </div>
      {show && <RMap onReady={handleReady}>{/* <RMarker lnglat={coords}></RMarker> */}</RMap>}
    </>
  );
}

export default App;
