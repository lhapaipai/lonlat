import { ControlPosition } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { updateClassNames, useMap } from "..";

type RControlHookOptions<T extends string = ControlPosition> = {
  position: T;
  className: string;
};

export default function useRControl<T extends string = ControlPosition>({
  position,
  className = "maplibregl-ctrl maplibregl-ctrl-group",
}: RControlHookOptions<T>) {
  const map = useMap();
  const controlElementRef = useRef<HTMLDivElement>();

  const prevOptionsRef = useRef<{ className: string }>({
    className,
  });

  if (!controlElementRef.current) {
    const ctrl = document.createElement("div");
    className.split(" ").forEach((name) => {
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

  if (prevOptionsRef.current.className !== className) {
    updateClassNames(
      controlElementRef.current,
      prevOptionsRef.current.className?.split(" ") || [],
      className?.split(" ") || [],
    );
  }

  prevOptionsRef.current = {
    className,
  };

  return controlElementRef.current;
}
