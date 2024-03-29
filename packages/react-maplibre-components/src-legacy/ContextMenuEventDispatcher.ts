import { LngLat, type Map, MapMouseEvent } from "maplibre-gl";
import { ReactElement, useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";

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
  const mapRef = useMap();

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !enabled) {
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

    map.on("contextmenu", handleContextMenu);
    return () => {
      map.off("contextmenu", handleContextMenu);
    };
  }, [mapRef, enabled]);

  return children;
}
