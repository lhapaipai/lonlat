import "./App.scss";
import "maplibre-theme/dist/core.css";
import "maplibre-theme/dist/default.css";
import "maplibre-react-components/dist/mrc.css";
import LayerSwitcherControl from "./components/LayerSwitcherControl";
import { useAppSelector } from "./store";
import {
  selectBaseLayer,
  selectHillshade,
  selectOptionalLayers,
  selectStreetView,
  selectTerrain,
} from "./store/layerSlice";

import { useEffect, useState } from "react";
import { Map, StyleSpecification } from "maplibre-gl";
import { RMap, RNavigationControl } from "maplibre-react-components";
import { DOM } from "~/shared/maplibre/dom";
import { prepareStyle } from "./util";

const marignier = { lng: 6.498, lat: 46.089 };

function handleAfterMapInstanciation(map: Map) {
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
  const optionalLayersId = useAppSelector(selectOptionalLayers);
  const terrain = useAppSelector(selectTerrain);
  const hillshade = useAppSelector(selectHillshade);
  const streetView = useAppSelector(selectStreetView);

  const [uncontrolledStyle, setUncontrolledStyle] = useState<
    StyleSpecification | string
  >({
    version: 8,
    sources: {},
    layers: [],
  });

  useEffect(() => {});

  // for debug
  useEffect(() => {
    prepareStyle(
      baseLayerId,
      optionalLayersId,
      terrain,
      hillshade,
      streetView,
    ).then((nextStyle) => setUncontrolledStyle(nextStyle));
  }, [baseLayerId, optionalLayersId, terrain, hillshade, streetView]);

  return (
    <>
      <RMap
        initialCenter={marignier}
        initialZoom={14}
        mapStyle={uncontrolledStyle}
        onMounted={handleAfterMapInstanciation}
      >
        <RNavigationControl />
        <LayerSwitcherControl />
      </RMap>
    </>
  );
}

export default App;
