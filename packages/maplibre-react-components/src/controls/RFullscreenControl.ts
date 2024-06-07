import {
  ControlPosition,
  IControl,
  FullscreenControl,
  FullscreenControlOptions,
} from "maplibre-gl";
import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "..";

type RFullscreenControlProps = FullscreenControlOptions & {
  position?: ControlPosition;
};

export const RFullscreenControl = memo(
  forwardRef<IControl, RFullscreenControlProps>(function RFullscreenControl(
    { position = "top-right", ...controlOptions },
    ref,
  ) {
    const control = useControl(position, () => new FullscreenControl(controlOptions));
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
