import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { RMap, RMarker } from "maplibre-react-components";
import { useLayoutEffect, useRef, useState } from "react";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"

const marignier = [6.498, 46.089] as [number, number];

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(true);
  const [listeners, setListeners] = useState(true);
  useLayoutEffect(() => {
    console.log(mapRef);
  });

  return (
    <>
      {show && (
        <RMap
          ref={mapRef}
          initialCenter={marignier}
          initialZoom={4}
          {...(listeners
            ? {
                onClick: (e) => {
                  console.log("onClick on the map", e);
                },
              }
            : {
                onMove: (e) => {
                  console.log("onMove on the map", e);
                },
              })}
        >
          <RMarker
            longitude={marignier[0]}
            latitude={marignier[1]}
            draggable={true}
            onDragEnd={(e) => {
              console.log("dragEnd", e);
            }}
          ></RMarker>
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
          <button onClick={() => setShow((s) => !s)}> {show ? "masquer" : "afficher"}</button>
        </div>
        <div>
          <button onClick={() => setListeners((l) => !l)}>change listeners</button>
        </div>
      </div>
    </>
  );
}

export default App;
