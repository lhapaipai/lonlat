import { Tabs } from "pentatrion-design";
import { RMap } from "maplibre-react-components";
import { Map, MapLibreEvent, StyleSpecification } from "maplibre-gl";

import SearchTab from "./search/SearchTab";

import DirectionTab from "./direction/DirectionTab";

import { useAppDispatch, useAppSelector } from "./store";
import { selectTab, selectViewState, tabChanged, viewStateChanged } from "./store/mapSlice";

import MapFlyer from "./MapFlyer";

import ContextMenuManager from "./ContextMenuManager";

import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
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
}

function App() {
  const viewState = useAppSelector(selectViewState);
  const dispatch = useAppDispatch();

  const baseLayerId = useAppSelector(selectBaseLayer);
  const optionalLayersId = useAppSelector(selectOptionalLayers);
  const terrain = useAppSelector(selectTerrain);
  const hillshade = useAppSelector(selectHillshade);
  const streetView = useAppSelector(selectStreetView);

  const [uncontrolledStyle, setUncontrolledStyle] = useState<StyleSpecification | string>({
    version: 8,
    sources: {},
    layers: [],
  });

  const tab = useAppSelector(selectTab);

  const tabs = [
    {
      id: "search",
      title: <i className="fe-search"></i>,
      content: <SearchTab />,
    },
    {
      id: "direction",
      title: <i className="fe-route"></i>,
      content: <DirectionTab />,
    },
  ];

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
    prepareStyle(baseLayerId, optionalLayersId, terrain, hillshade, streetView).then((nextStyle) =>
      setUncontrolledStyle(nextStyle),
    );
  }, [baseLayerId, optionalLayersId, terrain, hillshade, streetView]);

  return (
    <>
      <RMap
        onMoveEnd={handleMoveEnd}
        initialCenter={viewState.center}
        initialZoom={viewState.zoom}
        mapStyle={uncontrolledStyle}
        afterInstanciation={handleAfterMapInstanciation}
      >
        <BaseLayerControl />

        <MapFlyer />
        {tab === "direction" && <DirectionMap />}
        {tab === "search" && <SearchMap />}
        <ContextMenuManager />
      </RMap>
      <aside className="sidebar">
        <Tabs fullWidth={true} tabs={tabs} value={tab} onChange={(e) => dispatch(tabChanged(e))} />
      </aside>
    </>
  );
}

export default App;
