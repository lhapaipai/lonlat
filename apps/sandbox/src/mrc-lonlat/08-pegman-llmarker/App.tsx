import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-react-components/dist/maplibre-gl.css";
import "maplibre-react-components/dist/mrc.css";
import { Event, RMap } from "maplibre-react-components";
import { useLayoutEffect, useRef, useState } from "react";
import { Pegman, RPegman } from "pentatrion-geo";

const marignier = { lng: 6.498, lat: 46.089 };

function App() {
  const mapRef = useRef<Map>(null);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);

  const [markerCoords, setMarkerCoords] = useState<[number, number]>([
    marignier.lng,
    marignier.lat,
  ]);
  const [bearing, setBearing] = useState(0);

  useLayoutEffect(() => {
    mapRef.current?.on("move", (e) => {
      console.log(e.target.getBearing());
    });
  });

  return (
    <>
      {showMap && (
        <RMap ref={mapRef} initialCenter={marignier} initialZoom={8}>
          <RPegman
            longitude={markerCoords[0]}
            latitude={markerCoords[1]}
            bearing={bearing}
            draggable={true}
            onDragEnd={(e: Event<Pegman>) =>
              setMarkerCoords(e.target.getLngLat().toArray())
            }
          />
          <div className="sidebar">
            <div>
              <button onClick={() => console.log(mapRef)}>info</button>
            </div>
            <div>
              <button onClick={() => setCounter((c) => c + 1)}>
                counter {counter}
              </button>
            </div>
            <div>
              <button onClick={() => setShowMap((s) => !s)}>
                {showMap ? "masquer" : "afficher"}
              </button>
            </div>
            <div>
              Bearing
              <input
                type="range"
                min={0}
                max={360}
                value={bearing}
                onChange={(e) => setBearing(e.target.valueAsNumber)}
              />
              {bearing}deg
            </div>
          </div>
        </RMap>
      )}
    </>
  );
}

export default App;
