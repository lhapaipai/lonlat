import "./App.scss";
import { Map, Marker, MarkerDragEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useState } from "react";




const marignier = {
  longitude: 6.498,
  latitude: 46.089,
};

const marignierViewState = {
  ...marignier,
  zoom: 16,
};
function App() {
  const [marker, setMarker] = useState(marignier);

  const handleMarkerDrag = useCallback((event: MarkerDragEvent) => {
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  return (
    <>
      <RMap
        initialCenter={marignier}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
      >
        <RMarker
          longitude={marker.longitude}
          latitude={marker.latitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        />
      </RMap>
    </>
  );
}

export default App;
