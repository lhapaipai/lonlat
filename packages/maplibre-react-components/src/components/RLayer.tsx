import { LayerSpecification, Map } from "maplibre-gl";
import { CustomLayerInterface } from "react-map-gl";
import { useMap } from "..";
import { Ref, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

// BackgroundLayerSpecification has no source
type RLayerProps = (
  | Omit<LayerSpecification, "source" | "id">
  | Omit<CustomLayerInterface, "id">
) & {
  id?: string;
  source?: string;
  beforeId?: string;
};

type StyleLayer = Exclude<ReturnType<Map["getLayer"]>, undefined>;

let id = 1;

function uniqueId(): number {
  return id++;
}

function createLayer(map: Map, layerId: string, props: RLayerProps) {
  if (map.style && map.style._loaded) {
    if (
      props.type === "custom" ||
      props.type === "background" ||
      // source is defined for LayerSpecification who need
      (props.source && map.getSource(props.source))
    ) {
      const options = { ...props, id: layerId };
      delete options.beforeId;

      // @ts-ignore The types of the 'source' property are incompatible.
      // Unable to assign type 'string | undefined' to type 'SourceSpecification'.
      // checked above
      map.addLayer(options, props.beforeId);
      return map.getLayer(layerId);
    }
  }

  return undefined;
}

function updateLayer(map: Map, layerId: string, nextProps: RLayerProps, prevProps: RLayerProps) {
  if (nextProps.id !== prevProps.id || nextProps.type !== prevProps.type) {
    console.error(
      "<RLayer /> id should not change. If add/remove multiple JSX sources dynamically, make sure you use React's key prop to give each element a stable identity",
      prevProps,
      nextProps,
    );
  }

  // double check only for TypeScript narrowing
  if (prevProps.type === "custom" || nextProps.type === "custom") {
    return;
  }

  if (prevProps.beforeId !== nextProps.beforeId) {
    map.moveLayer(layerId, nextProps.beforeId);
  }

  if (prevProps.layout !== nextProps.layout) {
    for (const key in nextProps.layout) {
      if (nextProps.layout?.[key] !== prevProps.layout?.[key]) {
        map.setLayoutProperty(layerId, key, nextProps.layout?.[key]);
      }
    }
    for (const key in prevProps.layout) {
      if (!Object.prototype.hasOwnProperty.call(nextProps.layout, key)) {
        map.setLayoutProperty(layerId, key, undefined);
      }
    }
  }

  if (prevProps.paint !== nextProps.paint) {
    for (const key in nextProps.paint) {
      if (nextProps.paint?.[key] !== prevProps.paint?.[key]) {
        map.setPaintProperty(layerId, key, nextProps.paint[key]);
      }
    }
    for (const key in prevProps.paint) {
      if (!Object.prototype.hasOwnProperty.call(nextProps.paint, key)) {
        map.setPaintProperty(layerId, key, undefined);
      }
    }
  }

  // type is not "background" nor "custom", he has a filter property
  if (nextProps.type !== "background" && prevProps.filter && nextProps.filter) {
    map.setFilter(layerId, nextProps.filter);
  }
  if (prevProps.minzoom !== nextProps.minzoom || prevProps.maxzoom !== nextProps.maxzoom) {
    if (nextProps.minzoom && nextProps.maxzoom) {
      map.setLayerZoomRange(layerId, nextProps.minzoom, nextProps.maxzoom);
    }
  }
}

function RLayer(props: RLayerProps, ref: Ref<StyleLayer | undefined>) {
  const map = useMap();
  const prevPropsRef = useRef(props);

  const [, setVersion] = useState(0);

  // we don't want sourceId to change during the RSource lifecycle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const layerId = useMemo(() => props.id || `inline-layer-${uniqueId()}`, []);

  useEffect(() => {
    const reRender = () => setVersion((v) => v + 1);
    map.on("styledata", reRender);

    // in case layer is loaded between first render and useEffect call
    reRender();

    return () => {
      map.off("styledata", reRender);
      if (map.style && map.style._loaded && map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
    };
  }, [map, layerId]);

  let layer = map && map.style && map.getLayer(layerId);

  if (layer) {
    updateLayer(map, layerId, props, prevPropsRef.current);
  } else {
    layer = createLayer(map, layerId, props);
  }

  useImperativeHandle(ref, () => layer, [layer]);

  prevPropsRef.current = props;

  return null;
}

export default forwardRef(RLayer);
