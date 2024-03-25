import {
  NavigationControlOptions,
  NavigationControl as NativeNavigationControl,
} from "maplibre-gl";
import { CSSProperties, memo, useEffect } from "react";
import { ControlPosition } from "react-map-gl/maplibre";
import { applyReactStyle } from "./apply-react-style";
import useControl from "./useControl";

type NavigationControlProps = NavigationControlOptions & {
  position?: ControlPosition;
  style?: CSSProperties;
};

function NavigationControl({ position = "top-left", style, ...props }: NavigationControlProps) {
  const ctrl = useControl(() => new NativeNavigationControl(props), {
    position,
  });

  useEffect(() => {
    applyReactStyle(ctrl._container, style);
  }, [style]);

  return null;
}

export default memo(NavigationControl);
