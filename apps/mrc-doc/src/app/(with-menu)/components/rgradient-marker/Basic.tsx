"use client";

import { RGradientMarker, RMap } from "maplibre-react-components";

const center: [number, number] = [-0.5, 47.5];

export default function App() {
  return (
    <RMap
      className="maplibregl-theme-modern"
      initialCenter={center}
      initialZoom={2}
    >
      <RGradientMarker longitude={-0.5} latitude={48} />
    </RMap>
  );
}
