import { useState } from "react";
import "./App.scss";
import Map, { Layer, LayerProps, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import type { FeatureCollection, Point } from "geojson";
import { useAppDispatch, useAppSelector } from "./store";
import { selectViewState, viewStateChanged } from "./store/mapSlice";
import { ViewStateChangeEvent } from "react-map-gl/maplibre";

const geojson: FeatureCollection<Point> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [6.498, 46.089] },
      properties: {},
    },
  ],
};

const layerStyle: LayerProps = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

function App() {
  const [show, setShow] = useState(true);

  const initialViewState = useAppSelector(selectViewState);
  const dispatch = useAppDispatch();

  function handleMoveEnd(e: ViewStateChangeEvent) {
    dispatch(viewStateChanged(e.viewState));
  }

  return (
    <>
      <div className="sidebar">
        <button onClick={() => setShow((show) => !show)}>toggle map</button>
      </div>
      {show && (
        <Map
          onMoveEnd={handleMoveEnd}
          initialViewState={initialViewState}
          style={{ width: "100%", height: "100%" }}
          mapStyle="/styles/ign/PLAN.IGN/standard.json"
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      )}
    </>
  );
}

export default App;
