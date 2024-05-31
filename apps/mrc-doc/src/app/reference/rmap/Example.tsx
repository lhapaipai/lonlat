"use client";

import { RMap } from "maplibre-react-components";

const home = { lng: 6, lat: 46 };

export default function App() {
  return (
    <RMap
      initialCenter={home}
      style={{ width: "100%", height: 400 }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    />
  );
}
