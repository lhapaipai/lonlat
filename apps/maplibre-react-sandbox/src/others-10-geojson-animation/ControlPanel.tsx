import { memo } from "react";

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Animated GeoJSON</h3>
      <p>Render animation by updating geojson data source.</p>
    </div>
  );
}

export default memo(ControlPanel);
