import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-theme/dist/core.css";
import "maplibre-react-components/dist/mrc.css";

import {
  MrcLogoControl,
  RAttributionControl,
  RFullscreenControl,
  RGeolocateControl,
  RGradientMarker,
  RLogoControl,
  RMap,
  RNavigationControl,
  RPopup,
  RScaleControl,
  RSource,
  RTerrainControl,
  markerPopupOffset,
  useRControl,
} from "maplibre-react-components";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

const marignier = { lng: 6.498, lat: 46.089 };
const marignier2 = { lng: 6.2, lat: 46.089 };

const rasterDemTiles = [
  "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
];

function MyCtrl() {
  const { container } = useRControl({
    position: "bottom-right",
  });

  return createPortal(
    <>
      <button
        className="maplibregl-ctrl-geolocate"
        type="button"
        title="Find my location"
        aria-label="Find my location"
      >
        <span className="maplibregl-ctrl-icon" aria-hidden="true"></span>
      </button>
      <button
        className="maplibregl-ctrl-geolocate maplibregl-ctrl-geolocate-active"
        type="button"
        title="Find my location"
        aria-label="Find my location"
      >
        <span className="maplibregl-ctrl-icon" aria-hidden="true"></span>
      </button>
      <button
        className="maplibregl-ctrl-geolocate maplibregl-ctrl-geolocate-active-error"
        type="button"
        title="Find my location"
        aria-label="Find my location"
      >
        <span className="maplibregl-ctrl-icon" aria-hidden="true"></span>
      </button>
      <button
        className="maplibregl-ctrl-geolocate maplibregl-ctrl-geolocate-background"
        type="button"
        title="Find my location"
        aria-label="Find my location"
      >
        <span className="maplibregl-ctrl-icon" aria-hidden="true"></span>
      </button>
      <button
        className="maplibregl-ctrl-geolocate maplibregl-ctrl-geolocate-background-error"
        type="button"
        title="Find my location"
        aria-label="Find my location"
      >
        <span className="maplibregl-ctrl-icon" aria-hidden="true"></span>
      </button>
      <button
        className="maplibregl-ctrl-geolocate maplibregl-ctrl-geolocate-waiting"
        type="button"
        title="Find my location"
        aria-label="Find my location"
      >
        <span className="maplibregl-ctrl-icon" aria-hidden="true"></span>
      </button>
      <button
        className="maplibregl-ctrl-geolocate"
        type="button"
        title="Find my location"
        aria-label="Find my location"
        disabled
      >
        <span className="maplibregl-ctrl-icon" aria-hidden="true"></span>
      </button>
    </>,
    container,
  );
}

function CustomMap({ className }: { className?: string }) {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);

  return (
    <RMap
      ref={mapRef}
      initialCenter={marignier}
      initialZoom={8}
      className={className}
      mapStyle={"/assets/styles/ign/PLAN.IGN/standard.json"}
      cooperativeGestures={true}
    >
      <RSource
        type="raster-dem"
        id="terrarium"
        tiles={rasterDemTiles}
        encoding="terrarium"
        tileSize={256}
      />
      <RGradientMarker longitude={marignier.lng} latitude={marignier.lat} />
      <RPopup
        longitude={marignier.lng}
        latitude={marignier.lat}
        initialAnchor="top"
        offset={markerPopupOffset}
      >
        Hello world !
      </RPopup>
      <MrcLogoControl position="top-left" />
      <RFullscreenControl />
      <RGeolocateControl />
      <RNavigationControl />
      <RTerrainControl source="terrarium" />
      <RScaleControl />
      <RLogoControl />
      <MyCtrl />
      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>info</button>
        </div>
        <div>
          <button onClick={() => setCounter((c) => c + 1)}>
            counter {counter}
          </button>
        </div>
      </div>
    </RMap>
  );
}

function App() {
  return (
    <div className="p-8">
      <div className="h-[500px]">
        <CustomMap className="shadow-md" />
      </div>
    </div>
  );
}

export default App;
