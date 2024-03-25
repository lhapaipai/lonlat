import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Map, { MapRef, ViewState, ViewStateChangeEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const initialViewState: Partial<ViewState> = {
  longitude: 6.498,
  latitude: 46.089,
  zoom: 14,
};
function App() {
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState<Partial<ViewState>>(initialViewState);

  function handleMove(evt: ViewStateChangeEvent) {
    setViewState(evt.viewState);
  }

  useEffect(() => {
    setTimeout(() => {
      console.log("mapRef", mapRef);
    }, 2000);
  }, []);

  return (
    <Map
      ref={mapRef}
      initialViewState={viewState}
      onMoveEnd={handleMove}
      style={{ width: "100%", height: "100%" }}
      mapStyle="/styles/ign/PLAN.IGN/standard-geopf.json"
    />
  );
}

export default App;
