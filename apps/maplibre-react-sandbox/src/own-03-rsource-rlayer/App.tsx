import { Map, MapStyleDataEvent } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { RLayer, RMap, RMarker, RSource } from "maplibre-react-components";
import { useLayoutEffect, useRef, useState } from "react";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"

const usa = { lng: -100.7512266680283, lat: 39.757729910221286 };

const usaProvincesPaintStyle = {
  "fill-outline-color": "rgba(0,0,0,0.1)",
  "fill-color": "rgba(255,0,0,0.3)",
};

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(true);
  useLayoutEffect(() => {
    console.log(mapRef);
  });
  //             <RLayer key="usa-provinces-fill" type="fill" paint={useProvincesPaintStyle} />

  function handleStyleData(e: MapStyleDataEvent) {
    console.log("styledata", e);
  }

  return (
    <>
      {show && (
        <RMap
          onClick={(e) => console.log(e.lngLat)}
          ref={mapRef}
          initialCenter={usa}
          initialZoom={4}
          onStyleData={handleStyleData}
        >
          <RMarker
            longitude={usa.lng}
            latitude={usa.lat}
            draggable={true}
            onDragEnd={(e) => {
              console.log("dragEnd", e);
            }}
          ></RMarker>
          <RSource key="usa-provinces" type="geojson" data="/data/usa-provinces.geojson">
            <RLayer key="usa-provinces-fill" type="fill" paint={usaProvincesPaintStyle} />
          </RSource>
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
      </div>
    </>
  );
}

export default App;
