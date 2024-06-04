import { RMap } from "maplibre-react-components";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";

//"https://demotiles.maplibre.org/style.json"
const marignier = { lng: 6.498, lat: 46.089 };

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="absolute top-2 left-2 z-10">
        <button onClick={() => setVisible((v) => !v)}>
          show map {visible ? "visible" : "hidden"}
        </button>
      </div>
      {visible && (
        <RMap initialCenter={marignier} mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"></RMap>
      )}
    </>
  );
}

export default App;
