import { RMap } from "maplibre-react-components";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";

//"https://demotiles.maplibre.org/style.json"
const marignier = { lng: 6.498, lat: 46.089 };

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
