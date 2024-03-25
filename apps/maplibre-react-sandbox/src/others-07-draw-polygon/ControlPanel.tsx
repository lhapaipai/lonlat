import { area } from "@turf/turf";
import { Feature, Polygon } from "geojson";
import { memo } from "react";

function ControlPanel(props: { polygons: Feature<Polygon>[] }) {
  let polygonArea = 0;
  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
  }
  return (
    <div className="control-panel">
      <h3>Draw Polygon</h3>
      {polygonArea > 0 && (
        <p>
          {Math.round(polygonArea * 100) / 100} <br />
          square meters
        </p>
      )}
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/draw-polygon"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default memo(ControlPanel);
