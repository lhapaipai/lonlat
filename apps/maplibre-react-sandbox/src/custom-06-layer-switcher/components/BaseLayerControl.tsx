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
  const container = useRControl("bottom", "ll-layer-switcher");

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
        <img className="preview" src="/styles/terrarium/terrarium.jpg" />
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
    container,
  );
}
