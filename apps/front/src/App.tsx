import { RMap } from "maplibre-react-components";
import { AttributionControl, Map, MapLibreEvent, StyleSpecification } from "maplibre-gl";

import { useAppDispatch, useAppSelector } from "./store";
import { selectTab, selectViewState, viewStateChanged } from "./store/mapSlice";

import MapFlyer from "./MapFlyer";

import ContextMenuManager from "./ContextMenuManager";

import "./css/index.scss";
import "./App.scss";
import DirectionMap from "./direction/DirectionMap";
import SearchMap from "./search/SearchMap";
import { DOM } from "pentatrion-geo/src/maplibre/core/util/dom";
import BaseLayerControl from "./layer/BaseLayerControl";

import {
  selectBaseLayer,
  selectHillshade,
  selectOptionalLayers,
  selectStreetView,
  selectTerrain,
} from "./layer/layerSlice";
import { useEffect, useState } from "react";
import { prepareStyle } from "./layer/util";
import StreetViewMap from "./street-view/StreetViewMap";
import StreetViewWindow from "./street-view/StreetViewWindow";
import TabsControl from "./TabsControl";

function handleAfterMapInstanciation(map: Map) {
  map.loadImage("/icons/arrow.png").then((img) => {
    if (!map.hasImage("oneway")) {
      map.addImage("oneway", img.data);
    }
  });

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

  // @ts-ignore position added above
  map.addControl(new AttributionControl(), "bottom");
}

function App() {
  const viewState = useAppSelector(selectViewState);
  const dispatch = useAppDispatch();

  const baseLayerId = useAppSelector(selectBaseLayer);
  const optionalLayersId = useAppSelector(selectOptionalLayers);
  const terrain = useAppSelector(selectTerrain);
  const hillshade = useAppSelector(selectHillshade);
  const streetView = useAppSelector(selectStreetView);
  const tab = useAppSelector(selectTab);

  const [uncontrolledStyle, setUncontrolledStyle] = useState<StyleSpecification | string>({
    version: 8,
    sources: {},
    layers: [],
  });

  function handleMoveEnd(e: MapLibreEvent) {
    const map = e.target;
    dispatch(
      viewStateChanged({
        center: map.getCenter().toArray(),
        zoom: map.getZoom(),
      }),
    );
  }

  useEffect(() => {
    prepareStyle(baseLayerId, optionalLayersId, terrain, hillshade).then((nextStyle) =>
      setUncontrolledStyle(nextStyle),
    );
  }, [baseLayerId, optionalLayersId, terrain, hillshade]);

  return (
    <div id="app">
      <div id="principal">
        <RMap
          onMoveEnd={handleMoveEnd}
          initialCenter={viewState.center}
          initialZoom={viewState.zoom}
          initialAttributionControl={false}
          mapStyle={uncontrolledStyle}
          afterInstanciation={handleAfterMapInstanciation}
        >
          <TabsControl />
          <BaseLayerControl />

          <MapFlyer />
          {streetView && <StreetViewMap />}
          {tab === "direction" && <DirectionMap />}
          {tab === "search" && <SearchMap />}
          <ContextMenuManager />
        </RMap>
        <aside className="sidebar"></aside>
      </div>
      {streetView && <StreetViewWindow />}
    </div>
  );
}

export default App;
