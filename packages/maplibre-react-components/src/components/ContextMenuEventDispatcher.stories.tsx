import { useRef, useState } from "react";
import {
  ContextMenuEventDispatcher,
  MaplibreContextmenuEventDetail,
} from "./ContextMenuEventDispatcher";
import { Meta } from "@storybook/react";
import { ContextMenu, ContextMenuItem, ContextMenuItemMouseEvent } from "pentatrion-design";
import { Map } from "maplibre-gl";
import { RMap, RMarker } from "..";

const meta = {
  title: "maplibre-react-components/ContextMenu",
  component: ContextMenuEventDispatcher,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ height: "100vh" }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ContextMenuEventDispatcher>;
export default meta;

export const Basic = () => {
  const mapRef = useRef<Map>(null!);

  const [markerCoords, setMarkerCoords] = useState<[number, number] | null>(null);

  function handleClickBack(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    setMarkerCoords(mapEvent.detail.lngLat.toArray());
  }

  return (
    <RMap ref={mapRef}>
      {markerCoords && <RMarker longitude={markerCoords[0]} latitude={markerCoords[1]} />}
      <ContextMenuEventDispatcher>
        <ContextMenu eventName="contextmenu-custom">
          <ContextMenuItem label="Add marker" onClick={handleClickBack} />
        </ContextMenu>
      </ContextMenuEventDispatcher>
    </RMap>
  );
};
