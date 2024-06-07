import {
  ControlPosition,
  IControl,
  AttributionControl,
  AttributionControlOptions,
} from "maplibre-gl";
import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "..";

type RAttributionControlProps = AttributionControlOptions & {
  position?: ControlPosition;
};

export const RAttributionControl = memo(
  forwardRef<IControl, RAttributionControlProps>(function RAttributionControl(
    { position = "bottom-right", ...controlOptions },
    ref,
  ) {
    const control = useControl(position, () => new AttributionControl(controlOptions));
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
