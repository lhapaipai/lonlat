import { ViewState } from "react-map-gl";
import {
  Layer,
  LayerProps,
  Map,
  Source,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
} from "react-map-gl/maplibre";
import "./App.scss";
import { FeatureCollection, Point } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProcessedFeatures, RawFeature, RawFeatures } from "./types";
import { addPercentiles, dataLayerProps } from "./utils";
import ControlPanel from "./ControlPanel";

const initialViewState: Partial<ViewState> = {
  latitude: 40,
  longitude: -100,
  zoom: 3,
};

function App() {
  const [year, setYear] = useState(2015);
  const [rawFeatures, setRawFeatures] = useState<RawFeatures | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{
    feature: MapGeoJSONFeature;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    fetch("/data/us-income.geojson")
      .then((res) => res.json())
      .then((json: RawFeatures) => {
        setRawFeatures(json);
      })
      .catch((err) => console.error("could not load data", err));
  }, []);

  const onMouseMove = useCallback((event: MapLayerMouseEvent) => {
    /**
     * Appelé lorsqu'un périphérique de pointage (généralement une souris) est déplacé
     * alors que le curseur se trouve à l'intérieur de la carte. Lorsque vous déplacez
     * le curseur sur la carte, l'événement se déclenche chaque fois que le curseur
     * change de position sur la carte.
     *
     * Si interactiveLayerIds est spécifié, l'événement contiendra un champ de
     * fonctionnalités supplémentaires qui contient les fonctionnalités sous le curseur
     * de la couche spécifiée.
     */
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    if (!hoveredFeature) {
      return;
    }

    setHoverInfo(hoveredFeature ? { feature: hoveredFeature, x, y } : null);
  }, []);

  const data = useMemo(() => {
    return rawFeatures && addPercentiles(rawFeatures, (f: RawFeature) => f.properties.income[year]);
  }, [rawFeatures, year]);

  return (
    <>
      <Map
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        onMouseMove={onMouseMove}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
        interactiveLayerIds={["data"]}
      >
        <Source type="geojson" data={data}>
          <Layer id="data" {...dataLayerProps} />
        </Source>
        {hoverInfo && (
          <div className="tooltip" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
            <div>State: {hoverInfo.feature.properties.name}</div>
            <div>Median Household Income: {hoverInfo.feature.properties.value}</div>
            <div>Percentile: {(hoverInfo.feature.properties.percentile / 8) * 100}</div>
          </div>
        )}
      </Map>
      <ControlPanel year={year} onChange={setYear} />
    </>
  );
}

export default App;
