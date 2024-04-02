import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import BaseLayerControl from "./components/BaseLayerControl";
import { useAppSelector } from "./store";
import { selectBaseLayer, selectElevation } from "./store/layerSlice";
import { LayerInfos, layersById } from "./layers";
import { useEffect, useMemo } from "react";
import { createRasterStyle } from "pentatrion-design";
import { useSelector } from "react-redux";
import { StyleSpecification } from "maplibre-gl";
import { RMap, RNavigationControl, RSource, RTerrain } from "maplibre-react-components";

const marignier = { lng: 6.498, lat: 46.089 };

const terrariumTiles = ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"];

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

  const elevation = useSelector(selectElevation);

  return (
    <>
      <RMap
        initialCenter={marignier}
        initialZoom={14}
        mapStyle={mapStyle}
        initialAttributionControl={false}
      >
        <RNavigationControl />
        <BaseLayerControl />
        {elevation && (
          <RSource
            key="terrarium"
            id="terrarium"
            type="raster-dem"
            tiles={terrariumTiles}
            tileSize={256}
            encoding="terrarium"
          >
            <RTerrain source="terrarium" exaggeration={1.3} />
          </RSource>
        )}
      </RMap>
    </>
  );
}

export default App;
