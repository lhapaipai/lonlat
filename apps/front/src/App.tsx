import { ContextMenuEventDispatcher, RMap } from "maplibre-react-components";
import {
  AttributionControl,
  Map,
  MapLibreEvent,
  StyleSpecification,
} from "maplibre-gl";

import { useAppDispatch, useAppSelector } from "./store";
import { selectViewState, viewStateChanged } from "./store/mapSlice";

import MapFlyer from "./MapFlyer";

import ContextMenuManager from "./ContextMenuManager";

import DirectionMap from "~/features/direction/DirectionMap";
import SearchMap from "~/features/search/SearchMap";
import { DOM } from "pentatrion-geo/maplibre/core/util/dom";
import LayerSwitcherControl from "~/features/layer/LayerSwitcherControl";

import { selectLayer } from "~/features/layer/layerSlice";
import { useEffect, useRef, useState } from "react";
import { prepareStyle } from "~/features/layer/util";
import StreetViewMap from "~/features/street-view/StreetViewMap";
import StreetViewWindow from "~/features/street-view/StreetViewWindow";
import TabsControl from "./TabsControl";
import { RFrameRateControl } from "pentatrion-geo";
import { debug } from "~/config/constants";
import GeolocationMap from "~/features/geolocation/GeolocationMap";
import IsochroneControl from "./features/isochrone/IsochroneControl";
import { selectIsochroneReferenceFeature } from "./features/isochrone/isochroneSlice";
import { selectGeolocationStatus } from "./features/geolocation/geolocationSlice";
import IsochroneMap from "./features/isochrone/IsochroneMap";
import Extra from "./components/Extra";
import { selectDirectionElevationChart } from "./features/direction/directionSlice";
import DirectionElevationChart from "./features/direction/DirectionElevationChart";
import { useEventCallback } from "pentatrion-design";

function handleAfterMapInstanciation(map: Map) {
  console.log("handleAfterMapInstanciation", map._loaded);
  map.loadImage("/assets/graphics/icons/arrow.png").then((img) => {
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
  // @ts-ignore position added above
  map.addControl(new AttributionControl(), "bottom");
}

function App() {
  const viewState = useAppSelector(selectViewState);
  const dispatch = useAppDispatch();
  const principalRef = useRef<HTMLDivElement>(null!);

  const { baseLayer, optionalLayers, terrain, streetView } =
    useAppSelector(selectLayer);
  const geolocationEnabled = useAppSelector(selectGeolocationStatus) === "on";
  const isochroneReferenceFeature = useAppSelector(
    selectIsochroneReferenceFeature,
  );
  const showDirectionElevationChart = useAppSelector(
    selectDirectionElevationChart,
  );

  const [uncontrolledStyle, setUncontrolledStyle] = useState<
    StyleSpecification | string
  >({
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
        pitch: map.getPitch(),
        bearing: map.getBearing(),
      }),
    );
  }

  function handleResize(e: MapLibreEvent) {
    console.log("handleResize", e);
  }

  useEffect(() => {
    prepareStyle(baseLayer, optionalLayers, terrain).then((nextStyle) =>
      setUncontrolledStyle(nextStyle),
    );
  }, [baseLayer, optionalLayers, terrain]);

  const onResizeStable = useEventCallback((entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries) || !entries.length) {
      return;
    }
    const height = entries[0].contentRect.height;
    document.documentElement.style.setProperty("--map-height", `${height}px`);
  });
  useEffect(() => {
    const currentElt = principalRef.current;
    const resizeObserver = new ResizeObserver(onResizeStable);
    resizeObserver.observe(currentElt);
    return () => {
      void resizeObserver.unobserve(currentElt);
    };
  }, [onResizeStable]);

  return (
    <div id="app" className="flex h-full w-full flex-col md:flex-row">
      <div className="flex h-full w-full flex-1 flex-col">
        <div ref={principalRef} id="principal" className="flex-1">
          <RMap
            onResize={handleResize}
            onMoveEnd={handleMoveEnd}
            initialCenter={viewState.center}
            initialZoom={viewState.zoom}
            initialAttributionControl={false}
            mapStyle={uncontrolledStyle}
            onMounted={handleAfterMapInstanciation}
          >
            {debug && <RFrameRateControl />}
            <ContextMenuEventDispatcher />
            <TabsControl />
            <LayerSwitcherControl />
            <MapFlyer />
            {streetView && <StreetViewMap />}
            <DirectionMap />
            <SearchMap />
            <IsochroneMap />
            {geolocationEnabled && <GeolocationMap />}
            <ContextMenuManager />
            {isochroneReferenceFeature && <IsochroneControl />}
          </RMap>
        </div>
        {showDirectionElevationChart && (
          <Extra>
            <DirectionElevationChart />
          </Extra>
        )}
      </div>
      {streetView && <StreetViewWindow />}
    </div>
  );
}

export default App;
