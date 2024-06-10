import { useSelector } from "react-redux";
import { LayerId, layers, layersById } from "../layers";
import { useAppDispatch } from "../store";
import {
  baseLayerChanged,
  elevationToggled,
  selectBaseLayer,
  selectElevation,
} from "../store/layerSlice";
import { createPortal } from "react-dom";
import { useRControl } from "maplibre-react-components";
import { LayerButton } from "pentatrion-geo";
import clsx from "clsx";

export default function BaseLayerControl() {
  const { container } = useRControl({
    position: "bottom",
    className: clsx(
      "ll-layer-switcher flex overflow-x-auto flex-nowrap relative z-[1] select-none max-w-full pointer-events-auto gap-2 pt-0.5 pb-2 px-2 w-fit",
    ),
  });
  const dispatch = useAppDispatch();

  function handleChangeLayer(layerId: LayerId) {
    dispatch(baseLayerChanged(layerId));
  }

  const currentBaseLayerId = useSelector(selectBaseLayer);
  const elevation = useSelector(selectElevation);

  return createPortal(
    <>
      <LayerButton
        className={clsx("layer", elevation && "active")}
        key="terrain"
        onClick={() => dispatch(elevationToggled())}
        image="/assets/graphics/sprites/layers-1x.jpg"
        srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
        imagePositionY={-2052}
        label="3d"
      />

      {layers.map((layerId) => {
        const layer = layersById[layerId];
        return (
          <LayerButton
            className={clsx(
              "layer",
              "base",
              layerId === currentBaseLayerId && "active",
            )}
            image="/assets/graphics/sprites/all-layers-1x.jpg"
            srcSet="/assets/graphics/sprites/all-layers-1x.jpg 1x, /graphics/sprites/all-layers-2x.jpg 2x"
            key={layerId}
            onClick={() => handleChangeLayer(layerId)}
            imagePositionY={layer.offsetY}
            label={layer.label}
          />
        );
      })}
    </>,
    container,
  );
}
