import { Tabs } from "pentatrion-design";
import { ContextMenuEventDispatcher, RMap } from "maplibre-react-components";
import { Map, MapLibreEvent } from "maplibre-gl";

import SearchTab from "./search/SearchTab";

import DirectionTab from "./direction/DirectionTab";

import { useAppDispatch, useAppSelector } from "./store";
import {
  selectTab,
  selectViewState,
  tabChanged,
  viewStateChanged,
} from "./store/mapSlice";

import MapFlyer from "./MapFlyer";

import ContextMenuManager from "./ContextMenuManager";

import "./App.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import DirectionMap from "./direction/DirectionMap";
import SearchMap from "./search/SearchMap";
import GeolocationMap from "./geolocation/GeolocationMap";

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

  return (
    <>
      <RMap
        onMoveEnd={handleMoveEnd}
        initialCenter={viewState.center}
        initialZoom={viewState.zoom}
        mapStyle="/assets/styles/ign/PLAN.IGN/standard.json"
        onMounted={handleAfterMapInstanciation}
      >
        <ContextMenuEventDispatcher />
        <MapFlyer />
        {tab === "direction" && <DirectionMap />}
        {tab === "search" && <SearchMap />}
        <GeolocationMap />
        <ContextMenuManager />
      </RMap>
      <aside className="sidebar">
        <Tabs
          fullWidth={true}
          tabs={tabs}
          value={tab}
          onChange={(e) => dispatch(tabChanged(e))}
        />
      </aside>
    </>
  );
}

export default App;
