import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { RMap, RMarker, RSource, RTerrain } from "maplibre-react-components";
import { useRef, useState } from "react";





const marignier = { lng: 6.498, lat: 46.089 };

const rasterDemTiles = ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"];

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showTerrain, setShowTerrain] = useState(false);
  return (
    <>
      {showMap && (
        <RMap
          ref={mapRef}
          mapStyle="/styles/ign/PLAN.IGN/standard.json"
          initialCenter={marignier}
          initialZoom={13}
        >
          <RMarker longitude={marignier.lng} latitude={marignier.lat} />
          {showTerrain && (
            <RSource
              type="raster-dem"
              id="terrarium"
              tiles={rasterDemTiles}
              encoding="terrarium"
              tileSize={256}
            >
              <RTerrain source="terrarium" exaggeration={1.3} />
            </RSource>
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
          <button onClick={() => setShowMap((s) => !s)}>
            {showMap ? "masquer carte" : "afficher carte"}
          </button>
        </div>
        <div>
          <button onClick={() => setShowTerrain((t) => !t)}>
            {showTerrain ? "masquer terrain" : "afficher terrain"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
