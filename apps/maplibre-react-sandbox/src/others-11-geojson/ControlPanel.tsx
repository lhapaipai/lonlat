import { memo } from "react";

interface Props {
  year: number;
  onChange: (year: number) => void;
}

function ControlPanel({ year, onChange }: Props) {
  console.log("render control panel");
  return (
    <div className="control-panel">
      <h3>Interactive GeoJSON</h3>
      <p>
        Map showing median household income by state in year <b>{year}</b>. Hover over a state to
        see details.
      </p>
      <p>
        Data source: <a href="www.census.gov">US Census Bureau</a>
      </p>

      <hr />
      <div key={"year"} className="input">
        <label>Year</label>
        <input
          type="range"
          value={year}
          min={1995}
          max={2015}
          step={1}
          onChange={(evt) => onChange(evt.target.valueAsNumber)}
        />
      </div>
    </div>
  );
}

export default memo(ControlPanel);
