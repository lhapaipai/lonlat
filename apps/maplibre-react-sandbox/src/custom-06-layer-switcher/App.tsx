import "./App.scss";
import { Map, NavigationControl, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import BaseLayerControl from "./components/BaseLayerControl";
import { useAppSelector } from "./store";
import { selectBaseLayer, selectElevation } from "./store/layerSlice";
import { LayerInfos, layersById } from "./layers";
import { useEffect, useMemo } from "react";
import { createRasterStyle } from "pentatrion-design";
import { useSelector } from "react-redux";
import { StyleSpecification } from "maplibre-gl";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
//"https://demotiles.maplibre.org/style.json"
const marignier = [6.498, 46.089] as [number, number];

const marignierViewState = {
  longitude: marignier[0],
  latitude: marignier[1],
  zoom: 16,
};

const terrariumTiles = ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"];

function App() {
  const baseLayerId = useAppSelector(selectBaseLayer);
  const baseLayer: LayerInfos = layersById[baseLayerId];

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
      <Map
        initialViewState={marignierViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        attributionControl={false}
        terrain={elevation ? { source: "elevation" } : undefined}
      >
        <NavigationControl />
        <BaseLayerControl />
        <Source
          id="elevation"
          type="raster-dem"
          tiles={terrariumTiles}
          tileSize={256}
          encoding="terrarium"
        />
      </Map>
      {/* <aside className="sidebar">

      </aside> */}
    </>
  );
}

export default App;
