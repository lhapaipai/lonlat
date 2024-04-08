import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { ContextMenu, ContextMenuItem, ContextMenuItemMouseEvent, Tabs } from "pentatrion-design";
import SearchTab from "./tabs/SearchTab";
import { useAppDispatch, useAppSelector } from "./store";
import { selectTab, selectViewState, tabChanged, viewStateChanged } from "./store/mapSlice";
import { searchFeatureChanged, selectSearchFeature } from "./store/searchSlice";
import MapFlyer from "./MapFlyer";
import DirectionTab from "./tabs/DirectionTab";
import {
  directionLocationChanged,
  selectDirectionRoute,
  selectValidDirectionLocations,
} from "./store/directionSlice";
import { roadLayerStyle, roadLayerCasingStyle } from "./mapStyle";
import { createLonLatFeaturePoint } from "pentatrion-geo";
import {
  ContextMenuEventDispatcher,
  Event,
  MaplibreContextmenuEventDetail,
  RLayer,
  RMap,
  RMarker,
  RSource,
} from "maplibre-react-components";
import { MapLibreEvent, Marker } from "maplibre-gl";
import { ReactElement, useState } from "react";

function App1() {
  const viewState = useAppSelector(selectViewState);
  const dispatch = useAppDispatch();

  const searchFeature = useAppSelector(selectSearchFeature);
  const tab = useAppSelector(selectTab);

  const validDirectionLocations = useAppSelector(selectValidDirectionLocations);
  const directionRoute = useAppSelector(selectDirectionRoute);

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

  function handleSearchLocationDragEnd(e: Event<Marker>) {
    const lonlatFeature = createLonLatFeaturePoint(e.target.getLngLat(), 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  function handleDirectionLocationDragEnd(e: Event<Marker>, index: number) {
    console.log("dragEnd", e);
    const lonlatFeature = createLonLatFeaturePoint(e.target.getLngLat(), 0);
    dispatch(directionLocationChanged({ index, feature: lonlatFeature }));
  }

  function handleDirectionIndex(e: ContextMenuItemMouseEvent, index: number) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(directionLocationChanged({ index, feature: lonlatFeature }));
  }

  function handleClickInfos(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  const contextItems: ReactElement[] = [];
  if (tab === "search") {
    contextItems.push(
      <ContextMenuItem
        key="search-infos"
        label="Plus d'infos sur cet endroit"
        onClick={handleClickInfos}
      />,
    );
  } else if (tab === "direction") {
    contextItems.push(
      <ContextMenuItem
        key="direction-from"
        label="Itinéraire depuis ce lieu"
        onClick={(e) => handleDirectionIndex(e, 0)}
      />,
    );
    contextItems.push(
      <ContextMenuItem
        key="direction-to"
        label="Itinéraire jusqu'à ce lieu"
        onClick={(e) => handleDirectionIndex(e, 1)}
      />,
    );
  }

  return (
    <>
      <RMap
        onMoveEnd={handleMoveEnd}
        initialCenter={viewState.center}
        initialZoom={viewState.zoom}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
      >
        <MapFlyer />
        {searchFeature?.geometry.type === "Point" && (
          <RMarker
            key={searchFeature.properties.id}
            draggable={true}
            longitude={searchFeature.geometry.coordinates[0]}
            latitude={searchFeature.geometry.coordinates[1]}
            onDragEnd={handleSearchLocationDragEnd}
          />
        )}
        {validDirectionLocations.map(
          (feature, index) =>
            feature?.geometry.type === "Point" && (
              <RMarker
                key={feature.id}
                draggable={true}
                longitude={feature.geometry.coordinates[0]}
                latitude={feature.geometry.coordinates[1]}
                onDragEnd={(e) => handleDirectionLocationDragEnd(e, index)}
              />
            ),
        )}
        {directionRoute && (
          <>
            <RSource
              id="direction-route"
              key="direction-route"
              type="geojson"
              data={directionRoute}
            />
            <RLayer
              id="direction-road-casing"
              type="line"
              {...roadLayerCasingStyle}
              source="direction-route"
              beforeId="point coté"
            />
            <RLayer
              id="direction-road"
              type="line"
              {...roadLayerStyle}
              source="direction-route"
              beforeId="point coté"
            />
          </>
        )}
        {contextItems.length > 0 && (
          <ContextMenuEventDispatcher>
            <ContextMenu eventName="maplibre-contextmenu">{contextItems}</ContextMenu>
          </ContextMenuEventDispatcher>
        )}
      </RMap>
      <aside className="sidebar">
        <Tabs fullWidth={true} tabs={tabs} value={tab} onChange={(e) => dispatch(tabChanged(e))} />
      </aside>
    </>
  );
}

function App() {
  const [showMap, setShow] = useState(true);

  return showMap ? <App1 /> : <button onClick={() => setShow(true)}>Afficher app</button>;
}

export default App;
