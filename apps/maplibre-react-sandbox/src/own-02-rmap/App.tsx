import { Map, Marker } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { Event, RMap, RMarker, RPopup } from "maplibre-react-components";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Pin from "./Pin";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"

const marignier = [6.498, 46.089] as [number, number];
const geneva = { lng: 6.037, lat: 46.175 };

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const [listeners, setListeners] = useState(true);
  useLayoutEffect(() => {
    console.log(mapRef);
  });

  const handleDragEnd = useCallback((e: Event<Marker>) => {
    console.log("dragEnd", e);
  }, []);

  return (
    <>
      {showMap && (
        <RMap
          ref={mapRef}
          initialCenter={marignier}
          initialZoom={8}
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
        >
          <RMarker
            longitude={marignier[0]}
            latitude={marignier[1]}
            draggable={true}
            onDragEnd={handleDragEnd}
            onClick={(e) => {
              console.log("onClick Marker");
              e.stopPropagation();
              setShowPopup(true);
            }}
          />
          <RMarker longitude={geneva.lng} latitude={geneva.lat}>
            <Pin />
          </RMarker>

          {showPopup && (
            <RPopup
              longitude={geneva.lng}
              latitude={geneva.lat}
              onMapClick={() => {
                console.log("RPopup onMapMove");
                setShowPopup(false);
              }}
            >
              <p>Hello world</p>
            </RPopup>
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
          <button onClick={() => setListeners((l) => !l)}>change listeners</button>
        </div>
        <div>
          <button onClick={() => setShowPopup((l) => !l)}>
            {showPopup ? "masquer popup" : "afficher popup"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
