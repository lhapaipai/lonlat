import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-theme/classic.css";
import "maplibre-react-components/dist/mrc.css";
import { useEffect, useRef, useState } from "react";

const marignier = { lng: 6.498, lat: 46.089 };

function App() {
  const mapRef = useRef<HTMLDivElement>(null!);
  const [counter, setCounter] = useState(0);
  const [showMap, setShowMap] = useState(true);

  const mapInstanceRef = useRef<Map>();

  useEffect(() => {
    if (!mapInstanceRef.current) {
      console.log("remount");
      mapInstanceRef.current = new Map({
        center: marignier,
        zoom: 3,
        container: mapRef.current,
        style: "https://demotiles.maplibre.org/style.json",
      });
    }

    return () => {
      console.log("unMount map");
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = undefined;
      }
    };
  }, [showMap]);

  return (
    <>
      {showMap && <div ref={mapRef}></div>}
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
      </div>
    </>
  );
}

export default App;
