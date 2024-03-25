import "./App.scss";
import { Map, MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import ContextMenuEventDispatcher, {
  MaplibreContextmenuEventDetail,
} from "./components/ContextMenuEventDispatcher";
import { ContextMenu, ContextMenuItem, ContextMenuItemMouseEvent } from "pentatrion-design/index";
import { useRef } from "react";
import { Marker } from "maplibre-gl";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
// "https://demotiles.maplibre.org/style.json"
const marignier = [6.498, 46.089] as [number, number];

const marignierViewState = {
  longitude: marignier[0],
  latitude: marignier[1],
  zoom: 16,
};

const mapStyle =
  "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL";

function App() {
  const mapRef = useRef<MapRef>(null!);

  function handleClickBack(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    console.log("on click Back", mapEvent.detail);

    const marker = new Marker();
    marker.setLngLat(mapEvent.detail.lngLat);
    marker.addTo(mapRef.current.getMap());
  }

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={marignierViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
      >
        <ContextMenuEventDispatcher>
          <ContextMenu eventName="maplibre-contextmenu">
            <ContextMenuItem label="Back" onClick={handleClickBack} />
            <ContextMenuItem label="Forward" />
            <ContextMenuItem label="Reload" disabled />
            <ContextMenuItem label="Save As..." />
            <ContextMenuItem label="Print" />
          </ContextMenu>
        </ContextMenuEventDispatcher>
      </Map>
    </>
  );
}

export default App;
