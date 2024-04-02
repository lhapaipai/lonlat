import { ControlPosition } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { useMap } from "..";

export default function useRControl<T extends string = ControlPosition>(
  position: T,
  classNames = "maplibregl-ctrl maplibregl-ctrl-group",
) {
  const map = useMap();
  const controlElementRef = useRef<HTMLDivElement>();

  if (!controlElementRef.current) {
    const ctrl = document.createElement("div");
    classNames.split(" ").forEach((name) => {
      name !== "" && ctrl.classList.add(name);
    });

    controlElementRef.current = ctrl;
  }
  useEffect(() => {
    const ctrl = controlElementRef.current;

    if (ctrl && !ctrl.parentElement) {
      const positionContainer = map._controlPositions[position];
      if (!positionContainer) {
        throw new Error(`Unable to add control, position ${position} doesn't exists`);
      }
      if (position.indexOf("bottom") !== -1) {
        positionContainer.insertBefore(ctrl, positionContainer.firstChild);
      } else {
        positionContainer.appendChild(ctrl);
      }
    }

    return () => {
      controlElementRef.current && controlElementRef.current.remove();
    };
  }, [map, position]);

  return controlElementRef.current;
}
