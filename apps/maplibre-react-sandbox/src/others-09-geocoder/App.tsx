import "./App.scss";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import GeocoderControl from "./GeocoderControl";




const marignier = { lng: 6.498, lat: 46.089 };


function App() {
  return (
    <>
      <RMap
        initialCenter={marignier}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
      >
        <GeocoderControl position="top-left"></GeocoderControl>
      </RMap>
    </>
  );
}

export default App;
