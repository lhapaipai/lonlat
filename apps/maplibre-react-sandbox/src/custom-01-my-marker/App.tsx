import "./App.scss";
import { Map, Marker as OriginalMarker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Marker from "./Marker";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
const marignier = [6.498, 46.089] as [number, number];
const marignierChurch = [6.5001, 46.091] as [number, number];

const marignierViewState = {
  longitude: marignier[0],
  latitude: marignier[1],
  zoom: 16,
};
function App() {
  return (
    <>
      <Map
        initialViewState={marignierViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
      >
        <OriginalMarker
          longitude={marignier[0]}
          latitude={marignier[1]}
          anchor="bottom"
        ></OriginalMarker>
        <Marker
          longitude={marignierChurch[0]}
          latitude={marignierChurch[1]}
          anchor="bottom"
        ></Marker>
      </Map>
    </>
  );
}

export default App;
