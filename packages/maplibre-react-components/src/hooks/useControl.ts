import { ControlPosition, IControl, Map } from "maplibre-gl";
import { useMap } from "./useMap";
import { useEffect, useMemo } from "react";
import { useEventCallback } from "./useEventCallback";

type ControlHookOptions = {
  position: ControlPosition;
  factory: (map: Map) => IControl;
  onRemove?: (map: Map) => void;
};

type ControlHookReturn = IControl;

export function useControl({
  position = "top-right",
  factory,
  onRemove,
}: ControlHookOptions): ControlHookReturn {
  const map = useMap();
  // we don't want to re-instanciate new control if factory change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ctrl = useMemo(() => factory(map), [map]);
  const onRemoveStable = useEventCallback(onRemove || null);

  useEffect(() => {
    console.log("useControl useEffect");

    if (!map.hasControl(ctrl)) {
      console.log("map addControl");
      map.addControl(ctrl, position);
    }
    return () => {
      onRemoveStable && onRemoveStable(map);

      if (map.hasControl(ctrl)) {
        console.log("map removeControl uhh");
        map.removeControl(ctrl);
      } else {
        console.log("map has not control", ctrl);
      }
    };
  }, [map, ctrl, onRemoveStable, position]);
  return ctrl;
}
