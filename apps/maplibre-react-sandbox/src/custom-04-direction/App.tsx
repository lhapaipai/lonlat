import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { Tabs } from "pentatrion-design";
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
import { routeLayer } from "./mapStyle";
import { createLonLatFeaturePoint } from "pentatrion-geo";
import { Event, RLayer, RMap, RMarker, RSource } from "maplibre-react-components";
import { MapLibreEvent, Marker } from "maplibre-gl";
import { useState } from "react";

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
          <RSource id="direction-route" key="direction-route" type="geojson" data={directionRoute}>
            <RLayer {...routeLayer} />
          </RSource>
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
