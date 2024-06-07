import { Map, NavigationControl } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  RAttributionControl,
  RFullscreenControl,
  RGeolocateControl,
  RLogoControl,
  RMap,
  RMarker,
  RNavigationControl,
  RScaleControl,
  RTerrainControl,
  useRControl,
} from "maplibre-react-components";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const marignier = { lng: 6.498, lat: 46.089 };

function LayoutControl() {
  const { container } = useRControl({
    position: "bottom-left",
  });
  return createPortal(
    <>
      <p>Hello world !</p>
    </>,
    container,
  );
}

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showCtrl, setShowCtrl] = useState(true);
  useLayoutEffect(() => {
    console.log(mapRef);
  });

  const handleAfterInstanciation = useCallback((map: Map) => {
    map.addControl(new NavigationControl());
  }, []);

  return (
    <>
      {showMap && (
        <RMap
          ref={mapRef}
          initialCenter={marignier}
          initialZoom={4}
          onMounted={handleAfterInstanciation}
        >
          {showCtrl && <RFullscreenControl position="bottom-right" />}
          <RScaleControl />
          <RLogoControl />
          <RGeolocateControl />
          <RAttributionControl />
          <RMarker
            longitude={marignier.lng}
            latitude={marignier.lat}
            draggable={true}
            onDragEnd={(e) => {
              console.log("dragEnd", e);
            }}
          ></RMarker>
          {showCtrl && <LayoutControl />}
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
          <button onClick={() => setShowCtrl((s) => !s)}>
            {showCtrl ? "masquer controle" : "afficher controle"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
