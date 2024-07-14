import { RMap, ContextMenuEventAdapter } from "maplibre-react-components";
import {
  AttributionControl,
  Map,
  MapLibreEvent,
  StyleSpecification,
} from "maplibre-gl";

import { useAppDispatch, useAppSelector } from "./store";

import MapFlyer from "./MapFlyer";

import ContextMenuManager from "./ContextMenuManager";

import DirectionMap from "~/features/direction/DirectionMap";
import SearchMap from "~/features/search/SearchMap";
import { DOM } from "pentatrion-geo/maplibre/core";
import LayerSwitcherControl from "~/features/map/LayerSwitcherControl";

import { useEffect, useRef, useState } from "react";
import { prepareStyle } from "~/features/map/util";
import StreetViewMap from "~/features/street-view/StreetViewMap";
import StreetViewWindow from "~/features/street-view/StreetViewWindow";
import TabsControl from "./TabsControl";
import { RFrameRateControl } from "pentatrion-geo/maplibre/frame-rate-control";
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
import { selectMap, viewStateChanged } from "./features/map/mapSlice";

function onMounted(map: Map) {
  console.log("onMounted", map._loaded);
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
  const dispatch = useAppDispatch();
  const principalRef = useRef<HTMLDivElement>(null!);

  const { baseLayer, optionalLayers, terrain, streetView, viewState } =
    useAppSelector(selectMap);
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
            onZoomEnd={(e) => void console.log(e.target.getZoom())}
            onMoveEnd={handleMoveEnd}
            initialCenter={viewState.center}
            initialZoom={viewState.zoom}
            initialBearing={viewState.bearing}
            initialPitch={viewState.pitch}
            initialAttributionControl={false}
            mapStyle={uncontrolledStyle}
            onMounted={onMounted}
          >
            {debug && <RFrameRateControl />}
            <ContextMenuEventAdapter />
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
