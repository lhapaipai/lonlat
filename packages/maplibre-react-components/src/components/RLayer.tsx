import { FillLayerSpecification, CustomLayerInterface, Map, LayerSpecification } from "maplibre-gl";
import {
  Ref,
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { mapLibreContext } from "../context";

export type LayerOptions = LayerSpecification | CustomLayerInterface;

type RLayerProps = LayerOptions & {
  beforeId?: string;
};

// -> TODO failed to build
// type StyleLayer = Exclude<ReturnType<Map["getLayer"]>, undefined>;
type StyleLayer = unknown;

function createLayer(map: Map, layerOptions: LayerOptions, beforeId?: string) {
  // layer can't be added if style is not loaded
  if (map.style?._loaded) {
    if (
      // BackgroundLayerSpecification and CustomLayerInterface has no source
      layerOptions.type === "background" ||
      layerOptions.type === "custom" ||
      // source exists for LayerSpecification who need one
      (layerOptions.source && map.getSource(layerOptions.source))
    ) {
      console.log("createLayer", layerOptions.id);
      map.addLayer(layerOptions, beforeId && map.getLayer(beforeId) ? beforeId : undefined);

      return map.getLayer(layerOptions.id);
    }
  }

  return undefined;
}

function updateLayer(
  map: Map,
  { beforeId: nextBeforeId, ...nextOptions }: RLayerProps,
  { beforeId: prevBeforeId, ...prevOptions }: RLayerProps,
) {
  // double check only for TypeScript narrowing
  if (prevOptions.type === "custom" || nextOptions.type === "custom") {
    return;
  }
  console.log("updateLayer", nextOptions.id);

  if (prevBeforeId !== nextBeforeId) {
    map.moveLayer(nextOptions.id, nextBeforeId);
  }

  /**
   * we take random LayerSpecification to simulate same specification.
   * here FillLayerSpecification
   */

  // type is not "background" nor "custom", he has a filter property
  if (
    nextOptions.type !== "background" &&
    (nextOptions as unknown as CustomLayerInterface).type !== "custom" &&
    (prevOptions as FillLayerSpecification).filter !==
      (nextOptions as FillLayerSpecification).filter
  ) {
    map.setFilter(nextOptions.id, (nextOptions as FillLayerSpecification).filter);
  }

  const prevO = prevOptions as FillLayerSpecification;
  const nextO = nextOptions as FillLayerSpecification;

  if (prevO.layout !== nextO.layout) {
    if (nextO.layout) {
      for (const key of Object.keys(nextO.layout) as (keyof Exclude<
        FillLayerSpecification["layout"],
        undefined
      >)[]) {
        if (nextO.layout[key] !== prevO.layout?.[key]) {
          map.setLayoutProperty(nextOptions.id, key, nextO.layout[key]);
        }
      }
    }

    for (const key in prevO.layout) {
      if (!Object.prototype.hasOwnProperty.call(nextO.layout, key)) {
        map.setLayoutProperty(nextOptions.id, key, undefined);
      }
    }
  }

  if (prevO.paint !== nextO.paint) {
    if (nextO.paint) {
      for (const key of Object.keys(nextO.paint) as (keyof Exclude<
        FillLayerSpecification["paint"],
        undefined
      >)[]) {
        if (nextO.paint[key] !== prevO.paint?.[key]) {
          map.setPaintProperty(nextOptions.id, key, nextO.paint[key]);
        }
      }
    }
    for (const key in prevO.paint) {
      if (!Object.prototype.hasOwnProperty.call(nextO.paint, key)) {
        map.setPaintProperty(nextOptions.id, key, undefined);
      }
    }
  }

  if (prevO.minzoom !== nextO.minzoom || prevO.maxzoom !== nextO.maxzoom) {
    if (nextO.minzoom && nextO.maxzoom) {
      map.setLayerZoomRange(nextOptions.id, nextO.minzoom, nextO.maxzoom);
    }
  }
}

function RLayer(props: RLayerProps, ref: Ref<StyleLayer | undefined>) {
  console.time("rlayer");
  const { beforeId, ...layerOptions } = props;
  console.log("Render RLayer", layerOptions.id);

  const context = useContext(mapLibreContext);
  const map = context.mapManager?.map;

  if (!map) {
    throw new Error("use <RLayer /> component inside <RMap />");
  }

  const prevPropsRef = useRef(props);

  const [, setVersion] = useState(0);

  const id = layerOptions.id;
  const initialLayerId = useRef(id);

  if (id !== initialLayerId.current) {
    throw new Error(
      `RLayer id should not change. "${id}" "${initialLayerId.current}". If you defined id as const string add a "key" prop to your RLayer component`,
    );
  }
  if (props.type !== prevPropsRef.current.type) {
    throw new Error(
      `RLayer type should not change. "${props.type}" "${prevPropsRef.current.type}"`,
    );
  }

  useEffect(() => {
    const reRender = () => setVersion((v) => v + 1);
    map.on("styledata", reRender);

    if (map.style._loaded) {
      // in case layer is loaded between first render and useEffect call
      // like RSource
      reRender();
    }

    return () => {
      map.off("styledata", reRender);
      if (map.style && map.style._loaded && map.getLayer(id)) {
        map.removeLayer(id);
        context.controlledLayers = context.controlledLayers.filter((layerId) => layerId !== id);
      }
    };
  }, [map, id, context]);

  let layer = map.style?._loaded && map.getLayer(id);

  if (layer) {
    updateLayer(map, props, prevPropsRef.current);
  } else {
    layer = createLayer(map, layerOptions, beforeId);
    if (layer && !context.controlledLayers.includes(id)) {
      context.controlledLayers.push(id);
    }
  }

  useImperativeHandle(ref, () => layer, [layer]);

  prevPropsRef.current = props;
  console.timeEnd("rlayer");

  return null;
}

export default memo(forwardRef(RLayer));
