import { ControlPosition, IControl } from "maplibre-gl";
import { useContext, useEffect, useMemo } from "react";
import { MapContext, MapContextValue } from "react-map-gl/dist/esm/components/map";

type ControlOptions = {
  position?: ControlPosition;
};

function useControl(
  onCreate: (context: MapContextValue) => IControl,
  opts?: ControlOptions,
): IControl;
function useControl(
  onCreate: (context: MapContextValue) => IControl,
  onRemove: (context: MapContextValue) => void,
  opts?: ControlOptions,
): IControl;
function useControl(
  onCreate: (context: MapContextValue) => IControl,
  onAdd: (context: MapContextValue) => void,
  onRemove: (context: MapContextValue) => void,
  opts?: ControlOptions,
): IControl;
function useControl(
  onCreate: (context: MapContextValue) => IControl,
  arg1?: ((context: MapContextValue) => void) | ControlOptions,
  arg2?: ((context: MapContextValue) => void) | ControlOptions,
  arg3?: ControlOptions,
): IControl {
  const context = useContext(MapContext);

  const ctrl = useMemo(() => onCreate(context), []);

  useEffect(() => {
    const opts = (arg3 || arg2 || arg1) as ControlOptions;
    const onAdd = typeof arg1 === "function" && typeof arg2 === "function" ? arg1 : null;
    const onRemove = typeof arg2 === "function" ? arg2 : typeof arg1 === "function" ? arg1 : null;

    const { map } = context;
    if (!map.hasControl(ctrl)) {
      map.addControl(ctrl, opts?.position);
      if (onAdd) {
        onAdd(context);
      }
    }

    return () => {
      if (onRemove) {
        onRemove(context);
      }

      if (map.hasControl(ctrl)) {
        map.removeControl(ctrl);
      }
    };
  }, []);

  return ctrl;
}

export default useControl;
