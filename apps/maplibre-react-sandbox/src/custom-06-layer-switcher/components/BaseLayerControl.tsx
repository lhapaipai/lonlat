import { LayerId, layers, layersById } from "../layers";
import { useAppDispatch } from "../store";
import { baseLayerChanged } from "../store/layerSlice";

export default function BaseLayerControl() {
  const dispatch = useAppDispatch();

  function handleChangeLayer(layerId: LayerId) {
    dispatch(baseLayerChanged(layerId));
  }

  return (
    <div className="ll-layer-switcher">
      {layers.map((layerId) => {
        const layer = layersById[layerId];
        return (
          <div className="layer" key={layer.id} onClick={() => handleChangeLayer(layer.id)}>
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
