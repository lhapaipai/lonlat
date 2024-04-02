import { useEffect, useState } from "react";
import "./App.scss";
import { Layer, LayerProps, Map, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import ControlPanel from "./ControlPanel";
import { Point } from "geojson";

const marignier = { lng: 6.498, lat: 46.089 };

const marignierViewState = {
  longitude: marignier.lng,
  latitude: marignier.lat,
  zoom: 16,
};

const pointLayer: LayerProps = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

function pointOnCircle({
  center,
  angle,
  radius,
}: {
  center: [number, number];
  angle: number;
  radius: number;
}): Point {
  return {
    type: "Point",
    coordinates: [center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius],
  };
}

function App() {
  const [pointData, setPointData] = useState<Point | null>(null);

  useEffect(() => {
    const animation = window.requestAnimationFrame(() => {
      setPointData(
        pointOnCircle({
          center: marignier,
          angle: Date.now() / 1000,
          radius: 0.001,
        }),
      );
    });
    return () => window.cancelAnimationFrame(animation);
  });
  return (
    <>
      <RMap
        initialCenter={marignier}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
      >
        {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>
        )}
      </RMap>
      <ControlPanel />
    </>
  );
}

export default App;
