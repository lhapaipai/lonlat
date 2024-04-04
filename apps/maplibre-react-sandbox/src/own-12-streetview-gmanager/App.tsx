import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import { ResizeArea } from "pentatrion-design";
import { ignPlanStyleUrl } from "../shared/constants";
import { Event, RLayer, RMap, RSource, lngLatClassToObj } from "maplibre-react-components";
import { LLPegman, RPegman } from "pentatrion-geo";
import StreetView from "./StreetView";
import GoogleApiWrapper from "./GoogleApiWrapper";
import { googleMapsApiToken } from "../shared/constants";
import { Libraries } from "@googlemaps/js-api-loader";
const googleLibraries: Libraries = ["streetView"];

const marignier = { lat: 46.0918, lng: 6.4988 };
const initialHeading = 0;
const initialPitch = 0;

const googleStreetViewURLTiles = [
  "https://mts0.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts1.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts2.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts3.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
];

function App() {
  const [counter, setCounter] = useState(0);
  const [showStreetView, setShowStreetView] = useState(false);

  const [heading, setHeading] = useState(initialHeading);
  const [pitch, setPitch] = useState(initialPitch);
  const [coords, setCoords] = useState(marignier);

  function handlePegmanDragEnd(e: Event<LLPegman>) {
    setCoords(lngLatClassToObj(e.target.getLngLat()));
  }

  return (
    <div id="app">
      <div id="principal">
        <RMap
          onClick={(e) => {
            console.log(e.lngLat);
          }}
          initialCenter={coords}
          initialZoom={14}
          mapStyle={ignPlanStyleUrl}
        >
          {showStreetView && (
            <>
              <RPegman
                longitude={coords.lng}
                latitude={coords.lat}
                bearing={heading}
                draggable={true}
                onDragEnd={handlePegmanDragEnd}
              />
              <RSource
                id="streetview-raster"
                key="streetview-trace"
                type="raster"
                tiles={googleStreetViewURLTiles}
                tileSize={256}
              />
              <RLayer
                key="streetview-fill"
                source="streetview-raster"
                id="streetview-fill"
                type="raster"
              />
            </>
          )}
          <div className="sidebar">
            <div>
              <button onClick={() => setCounter((c) => c + 1)}>counter {counter}</button>
            </div>
            <div>
              <button onClick={() => setShowStreetView((s) => !s)}>
                {showStreetView ? "masquer streetview" : "afficher streetview"}
              </button>
            </div>
            <div>
              heading
              <input
                type="range"
                min={0}
                max={360}
                value={heading}
                onChange={(e) => setHeading(e.target.valueAsNumber)}
              />
              {heading} deg.
            </div>
            <div>
              pitch
              <input
                type="range"
                min={-90}
                max={90}
                value={pitch}
                onChange={(e) => setPitch(e.target.valueAsNumber)}
              />
              {pitch} deg.
            </div>
          </div>
        </RMap>
      </div>
      {showStreetView && (
        <div id="extra">
          <ResizeArea name="extra" position="left" />
          <GoogleApiWrapper
            apiKey={googleMapsApiToken}
            version="weekly"
            libraries={googleLibraries}
          >
            <StreetView
              heading={heading}
              pitch={pitch}
              coords={coords}
              setHeading={setHeading}
              setPitch={setPitch}
              setCoords={setCoords}
              setVisible={setShowStreetView}
            />
          </GoogleApiWrapper>
        </div>
      )}
    </div>
  );
}

// function App1() {
//   const [show, setShow] = useState(false);
//   return show ? <App /> : <button onClick={() => setShow(true)}>show</button>;
// }

export default App;
