import "maplibre-gl/dist/maplibre-gl.css";
import "./App.scss";
import { ContextMenu, ContextMenuItem, ContextMenuItemMouseEvent } from "pentatrion-design/index";
import { useRef } from "react";
import { Map, Marker } from "maplibre-gl";
import {
  ContextMenuEventDispatcher,
  MaplibreContextmenuEventDetail,
  RMap,
} from "maplibre-react-components";
import { ignPlanStyleUrl, marignier } from "../shared/constants";

function App() {
  const mapRef = useRef<Map>(null!);

  function handleClickBack(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    console.log("on click Back", mapEvent.detail);

    const marker = new Marker();
    marker.setLngLat(mapEvent.detail.lngLat);
    marker.addTo(mapRef.current);
  }

  return (
    <>
      <RMap ref={mapRef} initialCenter={marignier} initialZoom={16} mapStyle={ignPlanStyleUrl}>
        <ContextMenuEventDispatcher>
          <ContextMenu eventName="maplibre-contextmenu">
            <ContextMenuItem label="Add marker" onClick={handleClickBack} />
            <ContextMenuItem label="Do nothing" />
            <ContextMenuItem label="Disabled" disabled />
          </ContextMenu>
        </ContextMenuEventDispatcher>
      </RMap>
    </>
  );
}

export default App;
