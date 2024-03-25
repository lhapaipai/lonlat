import { useSelector } from "react-redux";
import { LayerId, layers, layersById } from "../layers";
import { useAppDispatch } from "../store";
import { baseLayerChanged, selectBaseLayer } from "../store/layerSlice";
import cn from "classnames";

export default function BaseLayerControl() {
  const dispatch = useAppDispatch();

  function handleChangeLayer(layerId: LayerId) {
    dispatch(baseLayerChanged(layerId));
  }

  const currentBaseLayerId = useSelector(selectBaseLayer);

  return (
    <div className="ll-layer-switcher">
      {layers.map((layerId) => {
        const layer = layersById[layerId];
        return (
          <div
            className={cn("layer", layerId === currentBaseLayerId && "active")}
            key={layerId}
            onClick={() => handleChangeLayer(layerId)}
          >
            <img
              style={{
                objectPosition: `${layer.thumbnailPosition[0]}px ${layer.thumbnailPosition[1]}`,
              }}
              className="preview"
              src={layer.thumbnail}
            />
            <div className="legend text-sm">{layer.label}</div>
          </div>
        );
      })}
    </div>
  );
}
