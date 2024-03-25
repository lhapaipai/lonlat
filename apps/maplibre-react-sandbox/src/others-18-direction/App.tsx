import "./App.scss";
import {
  Layer,
  LngLat,
  Map,
  Marker,
  MarkerDragEvent,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Tabs } from "pentatrion-design";
import SearchTab from "./tabs/SearchTab";
import { useAppDispatch, useAppSelector } from "./store";
import { selectTab, selectViewState, tabChanged, viewStateChanged } from "./store/mapSlice";
import { selectSearchFeature } from "./store/searchSlice";
import MapFlyer from "./MapFlyer";
import DirectionTab from "./tabs/DirectionTab";
import {
  directionLocationChanged,
  selectDirectionRoute,
  selectValidDirectionLocations,
} from "./store/directionSlice";
import { routeLayer } from "./mapStyle";
import { createLonLatFeaturePoint } from "pentatrion-geo";

function App() {
  const initialViewState = useAppSelector(selectViewState);
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

  function handleMoveEnd(e: ViewStateChangeEvent) {
    dispatch(viewStateChanged(e.viewState));
  }

  function handleDirectionLocationDragEnd(e: MarkerDragEvent, index: number) {
    console.log("dragEnd", e);
    const lonlatFeature = createLonLatFeaturePoint(e.lngLat as LngLat);
    dispatch(directionLocationChanged({ index, feature: lonlatFeature }));
  }
  return (
    <>
      <Map
        onMoveEnd={handleMoveEnd}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="/styles/ign/PLAN.IGN/standard-geopf.json"
      >
        <MapFlyer />
        {searchFeature && (
          <Marker
            key={searchFeature.properties.id}
            longitude={searchFeature.geometry.coordinates[0]}
            latitude={searchFeature.geometry.coordinates[1]}
          />
        )}
        {validDirectionLocations.map(
          (feature, index) =>
            feature && (
              <Marker
                key={feature.id}
                draggable={true}
                longitude={feature.geometry.coordinates[0]}
                latitude={feature.geometry.coordinates[1]}
                onDragEnd={(e) => handleDirectionLocationDragEnd(e, index)}
              />
            ),
        )}
        {directionRoute && (
          <Source type="geojson" data={directionRoute}>
            <Layer {...routeLayer} />
          </Source>
        )}
      </Map>
      <aside className="sidebar">
        <Tabs fullWidth={true} tabs={tabs} value={tab} onChange={(e) => dispatch(tabChanged(e))} />
      </aside>
    </>
  );
}

export default App;
