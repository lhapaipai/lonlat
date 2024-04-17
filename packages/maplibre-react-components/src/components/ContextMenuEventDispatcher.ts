import { LngLat, type Map, MapMouseEvent } from "maplibre-gl";
import { ReactElement, useEffect } from "react";
import { useMap } from "..";

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
      console.log("map.contextmenu");
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

    map.on("contextmenu", handleContextMenu);
    return () => {
      map.off("contextmenu", handleContextMenu);
    };
  }, [map, enabled]);

  return children;
}
