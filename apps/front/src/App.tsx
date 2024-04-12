import { RMap } from "maplibre-react-components";
import {
  AttributionControl,
  Map,
  MapLibreEvent,
  NavigationControl,
  StyleSpecification,
} from "maplibre-gl";

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
  selectOptionalLayers,
  selectStreetView,
  selectTerrain,
} from "./layer/layerSlice";
import { useEffect, useState } from "react";
import { prepareStyle } from "./layer/util";
import StreetViewMap from "./street-view/StreetViewMap";
import StreetViewWindow from "./street-view/StreetViewWindow";
import TabsControl from "./TabsControl";
import { RFrameRateControl } from "pentatrion-geo";

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
  // map.addControl(new NavigationControl(), "top-left");
  // @ts-ignore position added above
  // map.addControl(new AttributionControl(), "bottom");
}

function App() {
  const viewState = useAppSelector(selectViewState);
  const dispatch = useAppDispatch();

  const baseLayerId = useAppSelector(selectBaseLayer);
  const optionalLayersId = useAppSelector(selectOptionalLayers);
  const terrain = useAppSelector(selectTerrain);
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
    prepareStyle(baseLayerId, optionalLayersId, terrain).then((nextStyle) =>
      setUncontrolledStyle(nextStyle),
    );
  }, [baseLayerId, optionalLayersId, terrain]);

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
          <RFrameRateControl />
          <TabsControl />
          <BaseLayerControl />
          <MapFlyer />
          {streetView && <StreetViewMap />}
          {tab === "direction" && <DirectionMap />}
          {tab === "search" && <SearchMap />}
          <ContextMenuManager />
        </RMap>
      </div>
      {streetView && <StreetViewWindow />}
    </div>
  );
}

export default App;
