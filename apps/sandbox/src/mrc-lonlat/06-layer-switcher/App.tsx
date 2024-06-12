import "./App.scss";
import "maplibre-react-components/dist/maplibre-gl.css";
import "maplibre-react-components/dist/mrc.css";
import BaseLayerControl from "./components/BaseLayerControl";
import { useAppSelector } from "./store";
import { selectBaseLayer, selectElevation } from "./store/layerSlice";
import { LayerInfos, layersById } from "./layers";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Map, StyleSpecification } from "maplibre-gl";
import {
  RLayer,
  RMap,
  RNavigationControl,
  RSource,
  RTerrain,
} from "maplibre-react-components";
import { DOM } from "~/shared/maplibre/dom";
import { RFrameRateControl, createRasterStyle } from "pentatrion-geo";

const marignier = { lng: 6.498, lat: 46.089 };

const terrariumTiles = [
  "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
];

function handleAfterInstanciation(map: Map) {
  const positions = map._controlPositions;
  if (!positions["bottom"]) {
    const bottomContainer = DOM.create(
      "div",
      "maplibregl-ctrl-bottom-container",
      map._controlContainer,
    );
    positions["bottom-left"] &&
      bottomContainer.append(positions["bottom-left"]);
    positions["bottom-right"] &&
      bottomContainer.append(positions["bottom-right"]);
    positions["bottom"] = DOM.create(
      "div",
      "maplibregl-ctrl-bottom",
      bottomContainer,
    );
  }
}

function App() {
  const baseLayerId = useAppSelector(selectBaseLayer);
  const baseLayer: LayerInfos = layersById[baseLayerId];

  // for debug
  useEffect(() => {
    console.log(baseLayerId);
    // fetch(baseLayer.style)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data.layers));
  }, [baseLayerId]);

  const mapStyle = useMemo((): StyleSpecification | string => {
    switch (baseLayer.type) {
      case "vector":
        // @ts-ignore
        return baseLayer.style;
      case "raster":
        return createRasterStyle(baseLayer.style);
    }
    return {
      version: 8,
      sources: {},
      layers: [],
    };
  }, [baseLayer]);

  const elevation = useSelector(selectElevation);

  return (
    <>
      <RMap
        initialCenter={marignier}
        initialZoom={14}
        mapStyle={mapStyle}
        onMounted={handleAfterInstanciation}
      >
        <RFrameRateControl />
        <RNavigationControl />
        <BaseLayerControl />
        {elevation && (
          <>
            <RSource
              key="terrarium"
              id="terrarium"
              type="raster-dem"
              tiles={terrariumTiles}
              tileSize={256}
              encoding="terrarium"
            />
            <RLayer
              type="hillshade"
              key="hillshade"
              id="hillshade"
              source="terrarium"
            />
            <RTerrain source="terrarium" exaggeration={1.3} />
          </>
        )}
      </RMap>
    </>
  );
}

export default App;
