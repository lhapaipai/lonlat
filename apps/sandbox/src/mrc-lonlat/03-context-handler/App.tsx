import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import "./App.scss";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuItemMouseEvent,
} from "pentatrion-design/index";
import { Marker } from "maplibre-gl";
import {
  ContextMenuEventDispatcher,
  MaplibreContextmenuEventDetail,
  RMap,
  useMapAndCanvasRefs,
} from "maplibre-react-components";
import { ignPlanStyleUrl, marignier } from "../../shared/constants";

function App() {
  const { mapRef, canvasRef, setMapAndCanvasRef } = useMapAndCanvasRefs();

  function handleClickBack(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    console.log("on click Back", mapEvent.detail);

    const marker = new Marker();
    marker.setLngLat(mapEvent.detail.lngLat);
    marker.addTo(mapRef.current);
  }

  return (
    <>
      <RMap
        ref={setMapAndCanvasRef}
        initialCenter={marignier}
        initialZoom={16}
        mapStyle={ignPlanStyleUrl}
      >
        <ContextMenuEventDispatcher />
        <ContextMenu targetRef={canvasRef} eventName="contextmenu-maplibre">
          <ContextMenuItem label="Add marker" onClick={handleClickBack} />
          <ContextMenuItem label="Do nothing" />
          <ContextMenuItem label="Disabled" disabled />
        </ContextMenu>
      </RMap>
    </>
  );
}

export default App;
