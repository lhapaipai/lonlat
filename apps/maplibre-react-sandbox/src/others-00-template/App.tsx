import "./App.scss";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
//"https://demotiles.maplibre.org/style.json"
const marignier = { lng: 6.498, lat: 46.089 };

const marignierViewState = {
  longitude: marignier.lng,
  latitude: marignier.lat,
  zoom: 16,
};
function App() {
  return (
    <>
      <RMap
        initialCenter={marignier}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
      ></RMap>
    </>
  );
}

export default App;
