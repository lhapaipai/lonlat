import { Map, MapStyleDataEvent } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { RLayer, RMap, RMarker, RSource } from "maplibre-react-components";
import { useLayoutEffect, useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

const townPaintStyle = {
  "fill-outline-color": "rgba(0,0,0,0.1)",
  "fill-color": "rgba(255,0,0,0.3)",
};

const baseStyles = {
  standard: "/styles/ign/PLAN.IGN/standard.json",
  classique: "/styles/ign/PLAN.IGN/classique.json",
  accentue: "/styles/ign/PLAN.IGN/accentue.json",
};

type BaseStyle = keyof typeof baseStyles;

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [show, setShow] = useState(true);
  const [showAnotherSource, setShowAnotherSource] = useState(false);
  const [sourceData, setSourceData] = useState("marignier");

  const [baseStyle, setBaseStyle] = useState<BaseStyle>("standard");

  useLayoutEffect(() => {
    console.log("map", mapRef.current);
  }, []);

  function handleStyleData(e: MapStyleDataEvent) {
    console.log("styledata", e);
  }

  function handleLoad() {
    console.log("loaded");
  }

  return (
    <>
      {show && (
        <RMap
          onClick={(e) => console.log(e.lngLat)}
          ref={mapRef}
          initialCenter={marignier}
          initialZoom={12}
          onLoad={handleLoad}
          onStyleData={handleStyleData}
          mapStyle={baseStyles[baseStyle]}
        >
          <RMarker
            longitude={marignier.lng}
            latitude={marignier.lat}
            draggable={true}
            onDragEnd={(e) => {
              console.log("dragEnd", e);
            }}
          ></RMarker>
          {showAnotherSource && (
            <RSource key="thyez" id="thyez" type="geojson" data="/data/thyez.geojson">
              <RLayer key="thyez-fill" id="thyez-fill" type="fill" paint={townPaintStyle} />
            </RSource>
          )}
          <RSource key="town" id="town" type="geojson" data={`/data/${sourceData}.geojson`}>
            <RLayer key="town-fill" id="town-fill" type="fill" paint={townPaintStyle} />
          </RSource>
        </RMap>
      )}
      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>console.log(mapRef)</button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>reRender App {counter}</button>
        </div>
        <div>
          <button onClick={() => setShow((s) => !s)}>
            {show ? "masquer carte" : "afficher carte"}
          </button>
        </div>
        <div>
          <button
            onClick={() => setSourceData((s) => (s === "marignier" ? "cluses" : "marignier"))}
          >
            {sourceData === "marignier" ? "afficher cluses" : "afficher marignier"}
          </button>
        </div>
        <div>
          <button onClick={() => setShowAnotherSource((s) => !s)}>
            {showAnotherSource ? "masquer Thyez" : "afficher Thyez"}
          </button>
        </div>
        <div>
          <select onChange={(e) => setBaseStyle(e.target.value as BaseStyle)}>
            <option value="standard">IGN standard</option>
            <option value="classique">IGN classique</option>
            <option value="accentue">IGN accentue</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
