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
import { useControl } from "react-map-gl/maplibre";
import ControlContainer from "./ControlContainer";
import { createPortal } from "react-dom";
import { useState } from "react";

export default function BaseLayerControl() {
  const [_, setVersion] = useState(0);
  const ctrl = useControl<ControlContainer>(() => {
    const forceUpdate = () => setVersion((v) => v + 1);
    return new ControlContainer(forceUpdate, "ll-layer-switcher");
  });
  const map = ctrl.getMap();

  const dispatch = useAppDispatch();

  function handleChangeLayer(layerId: LayerId) {
    dispatch(baseLayerChanged(layerId));
  }

  const currentBaseLayerId = useSelector(selectBaseLayer);
  const elevation = useSelector(selectElevation);
  /*
    style={{
      objectPosition: `${layer.thumbnailPosition[0]}px ${layer.thumbnailPosition[1]}`,
    }}
  */
  return (
    map &&
    createPortal(
      <>
        <div
          className={cn("layer", elevation && "active")}
          key="elevation"
          onClick={() => dispatch(elevationToggled())}
        >
          {/* <img className="preview" src={layer.thumbnail} /> */}
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
              <img className="preview" src={layer.thumbnail} />
              <div className="legend text-sm">{layer.label}</div>
            </div>
          );
        })}
      </>,
      ctrl.getElement(),
    )
  );
}
