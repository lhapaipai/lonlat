import {
  BackgroundLayerSpecification,
  CircleLayerSpecification,
  FillExtrusionLayerSpecification,
  FillLayerSpecification,
  HeatmapLayerSpecification,
  HillshadeLayerSpecification,
  CustomLayerInterface,
  LineLayerSpecification,
  Map,
  RasterLayerSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";
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

type OptionalSource<T> = Omit<T, "source"> & { source?: string };

export type LayerOptions =
  | OptionalSource<FillLayerSpecification>
  | OptionalSource<LineLayerSpecification>
  | OptionalSource<SymbolLayerSpecification>
  | OptionalSource<CircleLayerSpecification>
  | OptionalSource<HeatmapLayerSpecification>
  | OptionalSource<FillExtrusionLayerSpecification>
  | OptionalSource<RasterLayerSpecification>
  | OptionalSource<HillshadeLayerSpecification>
  | BackgroundLayerSpecification // BackgroundLayerSpecification has no source
  | CustomLayerInterface;

type RLayerProps = LayerOptions & {
  beforeId?: string;
};

// -> TODO failed to build
// type StyleLayer = Exclude<ReturnType<Map["getLayer"]>, undefined>;
type StyleLayer = unknown;

function createLayer(map: Map, layerOptions: LayerOptions, beforeId?: string) {
  if (map.style && map.style._loaded) {
    if (
      layerOptions.type === "background" ||
      layerOptions.type === "custom" ||
      // source exists for LayerSpecification who need one
      (layerOptions.source && map.getSource(layerOptions.source))
    ) {
      // console.log("createLayer", layerOptions.id);
      if (beforeId && map.getLayer(beforeId)) {
        // @ts-ignore optional source checked above
        map.addLayer(layerOptions, beforeId);
      } else {
        // @ts-ignore optional source checked above
        map.addLayer(layerOptions);
      }
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
  // console.log("updateLayer", nextOptions.id);

  if (prevBeforeId !== nextBeforeId) {
    map.moveLayer(nextOptions.id, nextBeforeId);
  }

  // type is not "background" nor "custom", he has a filter property
  if (
    nextOptions.type !== "background" &&
    (prevOptions as FillLayerSpecification).filter !==
      (nextOptions as FillLayerSpecification).filter
  ) {
    map.setFilter(nextOptions.id, (nextOptions as FillLayerSpecification).filter);
  }

  // we take random LayerSpecification to simulate same specification.
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
  const { beforeId, ...layerOptions } = props;
  // console.log("Render RLayer");

  const context = useContext(mapLibreContext);
  const map = context.mapManager.map;

  const prevPropsRef = useRef(props);

  const [, setVersion] = useState(0);

  const layerId = layerOptions.id;
  const initialLayerId = useRef(layerId);

  if (layerId !== initialLayerId.current) {
    throw new Error(`RLayer id should not change. "${layerId}" "${initialLayerId.current}"`);
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
      if (map.style && map.style._loaded && map.getLayer(layerId)) {
        map.removeLayer(layerId);
        context.controlledLayers = context.controlledLayers.filter((id) => id !== layerId);
      }
    };
  }, [map, layerId, context]);

  let layer = map.style && map.getLayer(layerId);

  if (layer) {
    updateLayer(map, props, prevPropsRef.current);
  } else {
    layer = createLayer(map, layerOptions, beforeId);
    if (layer && !context.controlledLayers.includes(layerId)) {
      context.controlledLayers.push(layerId);
    }
  }

  useImperativeHandle(ref, () => layer, [layer]);

  prevPropsRef.current = props;

  return null;
}

export default memo(forwardRef(RLayer));
