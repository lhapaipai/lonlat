import { RMap } from "maplibre-react-components";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLayoutEffect, useState } from "react";
import { MapStyleDataEvent } from "maplibre-gl";

//"https://demotiles.maplibre.org/style.json"
const marignier = { lng: 6.498, lat: 46.089 };

function App() {
  const [visible, setVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  const [listeners, setListeners] = useState(true);

  useLayoutEffect(() => {
    // console.log("map ref", map);
  });

  function handleStyleData(e: MapStyleDataEvent) {
    console.log("styledata", e);
  }

  return (
    <>
      <div className="absolute top-2 left-2 z-10 bg-white">
        <div>
          <button onClick={() => setVisible((v) => !v)}>
            show map {visible ? "visible" : "hidden"}
          </button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>App counter {counter}</button>
        </div>
        <div>
          <button onClick={() => setListeners((l) => !l)}>change listeners</button>
        </div>
      </div>
      {visible && (
        <RMap
          onStyleData={handleStyleData}
          initialCenter={marignier}
          mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"
          {...(listeners
            ? {
                onClick: (e) => {
                  console.log("onClick on the map", e.lngLat, e);
                },
              }
            : {
                onMove: (e) => {
                  console.log("onMove on the map", e);
                },
              })}
        ></RMap>
      )}
    </>
  );
}

export default App;