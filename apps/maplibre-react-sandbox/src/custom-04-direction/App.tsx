import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { Tabs, getIndexLetter } from "pentatrion-design";
import SearchTab from "./tabs/SearchTab";
import { useAppDispatch, useAppSelector } from "./store";
import { selectTab, selectViewState, tabChanged, viewStateChanged } from "./store/mapSlice";
import { searchFeatureChanged, selectSearchFeature } from "./store/searchSlice";
import MapFlyer from "./MapFlyer";
import DirectionTab from "./tabs/DirectionTab";
import {
  directionLocationChanged,
  selectDirectionRoute,
  selectDirectionWaypoints,
  selectValidDirectionLocations,
} from "./store/directionSlice";
import {
  roadLayerStyle,
  roadLayerCasingStyle,
  waypointsLayerStyle,
  roadArrowLayerStyle,
} from "./mapStyle";
import { LLMarker, RLLMarker, createLonLatFeaturePoint } from "pentatrion-geo";
import { Event, RLayer, RMap, RMarker, RSource } from "maplibre-react-components";
import { Map, MapLibreEvent, Marker } from "maplibre-gl";
import ContextMenuManager from "./ContextMenuManager";

function handleAfterMapInstanciation(map: Map) {
  map.loadImage("/icons/arrow.png").then((img) => {
    if (!map.hasImage("oneway")) {
      map.addImage("oneway", img.data);
    }
  });
}

function App() {
  const viewState = useAppSelector(selectViewState);
  const dispatch = useAppDispatch();

  const searchFeature = useAppSelector(selectSearchFeature);
  const tab = useAppSelector(selectTab);

  const validDirectionLocations = useAppSelector(selectValidDirectionLocations);
  const directionRoute = useAppSelector(selectDirectionRoute);
  const directionWaypoints = useAppSelector(selectDirectionWaypoints);

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

  function handleDirectionLocationDragEnd(e: Event<LLMarker>, index: number) {
    const lonlatFeature = createLonLatFeaturePoint(e.target.getLngLat(), 0);
    dispatch(directionLocationChanged({ index, feature: lonlatFeature }));
  }

  return (
    <>
      <RMap
        onMoveEnd={handleMoveEnd}
        initialCenter={viewState.center}
        initialZoom={viewState.zoom}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
        afterInstanciation={handleAfterMapInstanciation}
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
              <RLLMarker
                color={
                  [0, validDirectionLocations.length - 1].includes(index) ? "#ffe64b" : "#c0c0c0"
                }
                scale={[0, validDirectionLocations.length - 1].includes(index) ? 1 : 0.75}
                key={feature.id}
                draggable={true}
                longitude={feature.geometry.coordinates[0]}
                latitude={feature.geometry.coordinates[1]}
                onDragEnd={(e) => handleDirectionLocationDragEnd(e, index)}
                text={getIndexLetter(index)}
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
              key="direction-road-casing"
              type="line"
              {...roadLayerCasingStyle}
              source="direction-route"
              beforeId="point coté"
            />
            <RLayer
              id="direction-road"
              key="direction-road"
              type="line"
              {...roadLayerStyle}
              source="direction-route"
              beforeId="point coté"
            />
            <RLayer
              id="directon-arrow"
              key="directon-arrow"
              type="symbol"
              {...roadArrowLayerStyle}
              source="direction-route"
              beforeId="point coté"
            />
          </>
        )}
        {directionWaypoints && (
          <>
            <RSource
              id="direction-waypoints"
              key="direction-waypoints"
              type="geojson"
              data={directionWaypoints}
            />
            <RLayer
              id="direction-waypoints"
              type="circle"
              {...waypointsLayerStyle}
              source="direction-waypoints"
              beforeId="point coté"
            />
          </>
        )}

        <ContextMenuManager />
      </RMap>
      <aside className="sidebar">
        <Tabs fullWidth={true} tabs={tabs} value={tab} onChange={(e) => dispatch(tabChanged(e))} />
      </aside>
    </>
  );
}

export default App;
