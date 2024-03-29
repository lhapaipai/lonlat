import "./App.scss";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { RMap } from "react-maplibre-components";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
//"https://demotiles.maplibre.org/style.json"
const marignier = [6.498, 46.089] as [number, number];

const marignierViewState = {
  longitude: marignier[0],
  latitude: marignier[1],
  zoom: 16,
};
function App() {
  return (
    <>
      <RMap
        initialCenter={marignier}
        initialZoom={16}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
        onClick={(e) => {
          console.log(e.lngLat);
        }}
      ></RMap>
    </>
  );
}

export default App;
