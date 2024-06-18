import { Map, StyleSpecification } from "maplibre-gl";
import "./App.scss";
import "maplibre-react-components/style.css";
import style from "./style.json";

const mapStyle = style as StyleSpecification;

new URL(window.location.toString()).searchParams
  .get("classes")
  ?.split("|")
  .forEach((className) => {
    document.body.classList.add(className);
  });

import {
  MrcLogoControl,
  RAttributionControl,
  RFullscreenControl,
  RGeolocateControl,
  RLogoControl,
  RMap,
  RMarker,
  RNavigationControl,
  RPopup,
  RScaleControl,
  RSource,
  RTerrainControl,
  markerPopupOffset,
  useRControl,
} from "maplibre-react-components";
import { useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

const marignier = { lng: 6.498, lat: 46.089 };
const marignier2 = { lng: 6.2, lat: 46.089 };
const leman = { lng: 6.382560880284075, lat: 46.41406563675616 };
const rasterDemTiles = ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"];

function MyCtrl() {
  const { container } = useRControl({
    position: "top-left",
  });

  return createPortal(
    <>
      <button
        className="maplibregl-ctrl-geolocate ring-1"
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

const acuracyCircleStyle = {
  transform: "translate(-50%, -50%) translate(148px, 250px) rotateX(0deg) rotateZ(0deg)",
  width: "297px",
  height: "297px",
  opacity: 1,
};

const dotStyle = {
  transform: "translate(-50%, -50%) translate(148px, 250px) rotateX(0deg) rotateZ(0deg)",
  opacity: 1,
};

function CustomMap({
  className,
  theme,
  scheme = "light",
}: {
  className?: string;
  theme?: "legacy" | "classic" | "modern";
  scheme?: "light" | "dark";
}) {
  const mapRef = useRef<Map>(null);
  //       mapStyle={"/assets/styles/ign/PLAN.IGN/standard.json"}

  return (
    <div className={clsx("h-[500px] p-8", scheme)}>
      <RMap
        ref={mapRef}
        initialCenter={marignier}
        initialZoom={8}
        initialAttributionControl={false}
        className={clsx(className, `shadow-md ml-theme-${theme}`)}
        mapStyle={mapStyle}
      >
        <RSource
          type="raster-dem"
          id="terrarium"
          tiles={rasterDemTiles}
          encoding="terrarium"
          tileSize={256}
        />
        <RMarker longitude={leman.lng} latitude={leman.lat}>
          <div
            className="maplibregl-user-location-accuracy-circle maplibregl-marker maplibregl-marker-anchor-center"
            style={acuracyCircleStyle}
          ></div>
          <div
            className="maplibregl-user-location-dot maplibregl-marker maplibregl-marker-anchor-center"
            style={dotStyle}
          ></div>
        </RMarker>
        <RMarker longitude={marignier2.lng} latitude={marignier2.lat} />

        <RMarker longitude={marignier2.lng} latitude={marignier2.lat} />
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
        <RGeolocateControl
          showAccuracyCircle={true}
          showUserLocation={true}
          trackUserLocation={true}
        />
        <RNavigationControl />
        <RTerrainControl source="terrarium" />
        <RLogoControl compact={false} />
        <RLogoControl compact={true} />
        <RScaleControl />
        <RAttributionControl compact={false} />
        <RAttributionControl compact={true} />
        <MyCtrl />
        <div className="ml-title">
          {theme} {scheme}
        </div>
      </RMap>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="grid grid-cols-2">
        <CustomMap theme="classic" scheme="light" />
        <CustomMap theme="classic" scheme="dark" />

        <CustomMap theme="modern" scheme="light" />
        <CustomMap theme="modern" scheme="dark" />

        <CustomMap theme="legacy" scheme="light" />
      </div>
    </>
  );
}

export default App;
