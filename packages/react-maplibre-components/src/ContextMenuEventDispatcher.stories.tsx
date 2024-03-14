import { useLayoutEffect, useRef, useState } from "react";
import { ContextMenuEventDispatcher, MaplibreContextmenuEventDetail } from ".";
import { Meta } from "@storybook/react";
import { MapRef, Map, Marker } from "react-map-gl/maplibre";
import { ContextMenu, ContextMenuItem, ContextMenuItemMouseEvent } from "pentatrion-design";

const meta = {
  title: "Maplibre-React/ContextMenu",
  component: ContextMenuEventDispatcher,
  decorators: [
    (Story) => {
      useLayoutEffect(() => {
        document.body.classList.remove("sb-main-padded");
      }, []);
      return <Story />;
    },
  ],
} satisfies Meta<typeof ContextMenuEventDispatcher>;
export default meta;

export const Basic = () => {
  const mapRef = useRef<MapRef>(null!);

  const [markerCoords, setMarkerCoords] = useState<[number, number] | null>(null);

  function handleClickBack(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    setMarkerCoords(mapEvent.detail.lngLat.toArray());
  }

  return (
    <Map
      ref={mapRef}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    >
      {markerCoords && <Marker longitude={markerCoords[0]} latitude={markerCoords[1]} />}
      <ContextMenuEventDispatcher>
        <ContextMenu eventName="maplibre-contextmenu">
          <ContextMenuItem label="Add marker" onClick={handleClickBack} />
        </ContextMenu>
      </ContextMenuEventDispatcher>
    </Map>
  );
};
