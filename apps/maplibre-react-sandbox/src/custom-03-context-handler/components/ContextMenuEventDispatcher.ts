import { LngLatLike, MapMouseEvent, Point } from "maplibre-gl";
import { ReactElement, useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";

export interface MaplibreContextmenuEventDetail {
  originalEvent: MouseEvent;
  point: Point;
  lngLat: LngLatLike;
}

interface Props {
  children: ReactElement;
  enabled?: boolean;
}
export default function ContextMenuEventDispatcher({ children, enabled = true }: Props) {
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
