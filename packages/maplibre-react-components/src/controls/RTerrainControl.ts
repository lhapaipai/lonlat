import { ControlPosition, IControl, TerrainControl, TerrainSpecification } from "maplibre-gl";
import { memo, forwardRef, useImperativeHandle } from "react";
import { useControl } from "..";

type RTerrainControlProps = TerrainSpecification & {
  position?: ControlPosition;
};

export const RTerrainControl = memo(
  forwardRef<IControl, RTerrainControlProps>(function RTerrainControl(
    { position = "top-right", ...controlOptions },
    ref,
  ) {
    const control = useControl(position, () => new TerrainControl(controlOptions));
    useImperativeHandle(ref, () => control);
    return null;
  }),
);
