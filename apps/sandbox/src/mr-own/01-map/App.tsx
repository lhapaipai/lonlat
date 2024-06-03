import { RMap } from "maplibre-react-components";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import { Button } from "pentatrion-design";

//"https://demotiles.maplibre.org/style.json"
const marignier = { lng: 6.498, lat: 46.089 };

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div className="absolute top-2 left-2 z-10">
        <Button onClick={() => setVisible((v) => !v)}>
          show map {visible ? "visible" : "hidden"}
        </Button>
      </div>
      {visible && (
        <RMap
          initialCenter={marignier}
          style={{ width: "100%", height: "100%" }}
          mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"
        ></RMap>
      )}
    </>
  );
}

export default App;
