import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { RMap } from "maplibre-react-components";
import { useLayoutEffect, useRef } from "react";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"

const marignier = [6.498, 46.089] as [number, number];

function App() {
  const mapRef = useRef<Map>(null);

  useLayoutEffect(() => {
    console.log(mapRef);
  });

  return (
    <>
      <RMap ref={mapRef} initialCenter={marignier} initialZoom={4}></RMap>
      <button onClick={() => console.log(mapRef)}>info</button>
    </>
  );
}

export default App;
