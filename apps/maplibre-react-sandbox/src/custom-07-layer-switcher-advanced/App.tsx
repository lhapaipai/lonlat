import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import BaseLayerControl from "./components/BaseLayerControl";
import { useAppSelector } from "./store";
import { selectBaseLayer } from "./store/layerSlice";
import { LayerInfos, layersById } from "./layers";
import { useEffect, useMemo } from "react";
import { createRasterStyle } from "pentatrion-design";
import { Map, StyleSpecification } from "maplibre-gl";
import { RMap, RNavigationControl } from "maplibre-react-components";
import { DOM } from "maplibre-gl/src/util/dom";

const marignier = { lng: 6.498, lat: 46.089 };

const terrariumTiles = ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"];

function handleAfterInstanciation(map: Map) {
  const positions = map._controlPositions;
  if (!positions["bottom"]) {
    const bottomContainer = DOM.create(
      "div",
      "maplibregl-ctrl-bottom-container",
      map._controlContainer,
    );
    positions["bottom-left"] && bottomContainer.append(positions["bottom-left"]);
    positions["bottom-right"] && bottomContainer.append(positions["bottom-right"]);
    positions["bottom"] = DOM.create("div", "maplibregl-ctrl-bottom", bottomContainer);
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

  return (
    <>
      <RMap
        initialCenter={marignier}
        initialZoom={14}
        mapStyle={mapStyle}
        afterInstanciation={handleAfterInstanciation}
      >
        <RNavigationControl />
        <BaseLayerControl />
      </RMap>
    </>
  );
}

export default App;
