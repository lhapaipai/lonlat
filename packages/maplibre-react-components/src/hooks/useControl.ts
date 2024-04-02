import { ControlPosition, IControl, Map } from "maplibre-gl";
import { useMap } from "..";
import { useEffect, useMemo } from "react";
import { useEventCallback } from "./useEventCallback";

export default function useControl(
  position: ControlPosition,
  factory: (map: Map) => IControl,
  onRemove?: (map: Map) => void,
) {
  const map = useMap();
  // we don't want to re-instanciate new control if factory change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ctrl = useMemo(() => factory(map), [map]);

  const onRemoveStable = useEventCallback(onRemove || null);

  useEffect(() => {
    if (!map.hasControl(ctrl)) {
      map.addControl(ctrl, position);
    }
    return () => {
      onRemoveStable && onRemoveStable(map);

      if (map.hasControl(ctrl)) {
        map.removeControl(ctrl);
      }
    };
  }, [map, ctrl, onRemoveStable, position]);
  return ctrl;
}
