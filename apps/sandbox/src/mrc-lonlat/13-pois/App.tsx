import {
  FillLayerSpecification,
  LineLayerSpecification,
  Map,
} from "maplibre-gl";
import "./App.scss";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { RLayer, RMap, RSource } from "maplibre-react-components";
import { useMemo, useRef, useState } from "react";

import { ignPlanStyleUrl, marignier } from "../../shared/constants";
import { routeFeature } from "./data";
import { Range } from "pentatrion-design";
import {
  along,
  circle,
  featureCollection,
  length,
  lineString,
  point,
} from "@turf/turf";
import { simplifyCoords } from "pentatrion-geo";
import { Feature, Point } from "geojson";

const originalLinePaintStyle: LineLayerSpecification["paint"] = {
  "line-color": "#333",
  "line-width": 2,
};

const simplifiedLinePaintStyle: LineLayerSpecification["paint"] = {
  "line-color": "red",
  "line-width": 2,
};

const circlesPaintStyle: FillLayerSpecification["paint"] = {
  "fill-color": "#333",
  "fill-opacity": 0.5,
};

function App() {
  const mapRef = useRef<Map>(null);

  const [tolerance, setTolerance] = useState(0.005);
  const [interval, setInterval] = useState(1500);
  const [circleRadius, setCircleRadius] = useState(1000);
  const simplifiedRoute = useMemo(() => {
    const simplifiedCoords = simplifyCoords(
      routeFeature.geometry.coordinates,
      tolerance,
    );
    console.log(
      "route simplification",
      routeFeature.geometry.coordinates.length,
      simplifiedCoords.length,
    );
    return lineString(simplifiedCoords);
  }, [tolerance]);

  const routeCircles = useMemo(() => {
    const routePoints: Feature<Point>[] = [
      point(routeFeature.geometry.coordinates[0]),
    ];

    let distance: number = interval;
    const simplifiedRouteLength = length(simplifiedRoute, { units: "meters" });
    while (distance < simplifiedRouteLength) {
      const point = along(simplifiedRoute, distance, { units: "meters" });
      routePoints.push(point);
      distance += interval;
    }
    routePoints.push(
      point(
        routeFeature.geometry.coordinates[
          routeFeature.geometry.coordinates.length - 1
        ],
      ),
    );
    console.log(
      distance,
      simplifiedRouteLength,
      routePoints.map((point) => point.geometry.coordinates),
    );
    return featureCollection(
      routePoints.map((point) => circle(point, circleRadius / 1000)),
    );
  }, [simplifiedRoute, interval, circleRadius]);

  return (
    <>
      <RMap
        ref={mapRef}
        mapStyle={ignPlanStyleUrl}
        initialCenter={marignier}
        initialZoom={8}
      >
        <RSource type="geojson" data={routeFeature} id="route" />
        <RLayer
          type="line"
          id="route"
          source="route"
          paint={originalLinePaintStyle}
        />

        <RSource type="geojson" data={simplifiedRoute} id="simplified-route" />
        <RLayer
          type="line"
          id="simplified-route"
          source="simplified-route"
          paint={simplifiedLinePaintStyle}
        />

        <RSource type="geojson" data={routeCircles} id="along-circles" />
        <RLayer
          type="fill"
          id="along-circles"
          source="along-circles"
          paint={circlesPaintStyle}
        />
      </RMap>

      <div className="sidebar">
        <div>
          <button onClick={() => console.log(mapRef)}>info</button>
        </div>

        <div className="mb-6 flex flex-col gap-3">
          <span>tolerance</span>
          <Range
            value={tolerance}
            onChange={(e) => setTolerance(e.target.valueAsNumber)}
            min={0.0001}
            max={0.01}
            step={0.0001}
          />
        </div>
        <div className="mb-6 flex flex-col gap-3">
          <span>interval</span>
          <Range
            value={interval}
            onChange={(e) => setInterval(e.target.valueAsNumber)}
            min={250}
            max={2000}
            step={125}
          />
        </div>
        <div className="mb-6 flex flex-col gap-3">
          <span>circle radius</span>
          <Range
            value={circleRadius}
            onChange={(e) => setCircleRadius(e.target.valueAsNumber)}
            min={250}
            max={2000}
            step={125}
          />
        </div>
      </div>
    </>
  );
}

export default App;
