import { useSelector } from "react-redux";
import { LayerId, layers, layersById } from "../layers";
import { useAppDispatch } from "../store";
import {
  baseLayerChanged,
  elevationToggled,
  selectBaseLayer,
  selectElevation,
} from "../store/layerSlice";
import cn from "classnames";
import { createPortal } from "react-dom";
import { useRControl } from "maplibre-react-components";

export default function BaseLayerControl() {
  const { container } = useRControl({
    position: "bottom",
    className: "ll-layer-switcher",
  });
  const dispatch = useAppDispatch();

  function handleChangeLayer(layerId: LayerId) {
    dispatch(baseLayerChanged(layerId));
  }

  const currentBaseLayerId = useSelector(selectBaseLayer);
  const elevation = useSelector(selectElevation);

  return createPortal(
    <>
      <div
        className={cn("layer", elevation && "active")}
        key="elevation"
        onClick={() => dispatch(elevationToggled())}
      >
        <img
          className="preview"
          src="/assets/graphics/sprites/all-layers-1x.jpg"
          srcSet="/assets/graphics/sprites/all-layers-1x.jpg 1x, /graphics/sprites/all-layers-2x.jpg 2x"
          style={{ objectPosition: `0px -2052px` }}
        />
        <div className="legend text-sm">3D</div>
      </div>
      {layers.map((layerId) => {
        const layer = layersById[layerId];
        return (
          <div
            className={cn("layer", layerId === currentBaseLayerId && "active")}
            key={layerId}
            onClick={() => handleChangeLayer(layerId)}
          >
            <div className="type">
              <i className={`fe-${layer.type}`}></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/all-layers-1x.jpg"
              srcSet="/assets/graphics/sprites/all-layers-1x.jpg 1x, /graphics/sprites/all-layers-2x.jpg 2x"
              style={{ objectPosition: `0px ${layer.offsetY}px` }}
            />
            <div className="legend text-sm">{layer.label}</div>
          </div>
        );
      })}
    </>,
    container,
  );
}
