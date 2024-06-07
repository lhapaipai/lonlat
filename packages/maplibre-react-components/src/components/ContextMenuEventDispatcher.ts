import { LngLat, type Map, MapMouseEvent } from "maplibre-gl";
import { ReactElement, useEffect } from "react";
import { useMap } from "../hooks/useMap";

type Point = ReturnType<InstanceType<typeof Map>["project"]>;

export interface MaplibreContextmenuEventDetail {
  originalEvent: MouseEvent;
  point: Point;
  lngLat: LngLat;
}

interface Props {
  children: ReactElement;
  enabled?: boolean;
}
export function ContextMenuEventDispatcher({ children, enabled = true }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleContextMenu({ originalEvent, point, lngLat }: MapMouseEvent) {
      document.dispatchEvent(
        new CustomEvent<MaplibreContextmenuEventDetail>("maplibre-contextmenu", {
          detail: {
            originalEvent,
            point,
            lngLat,
          },
        }),
      );
    }

    const eventName = window.matchMedia("(pointer: coarse)").matches ? "click" : "contextmenu";
    map.on(eventName, handleContextMenu);
    return () => {
      map.off(eventName, handleContextMenu);
    };
  }, [map, enabled]);

  return children;
}
