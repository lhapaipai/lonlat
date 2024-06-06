import {
  CustomLayerInterface,
  GeoJSONSource,
  GeoJSONSourceSpecification,
  ImageSource,
  ImageSourceSpecification,
  Map,
  RasterSourceSpecification,
  RasterTileSource,
  Source,
  SourceSpecification,
  VideoSource,
  VideoSourceSpecification,
} from "maplibre-gl";
import {
  Children,
  ReactElement,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
  Ref,
  useImperativeHandle,
  useContext,
  memo,
} from "react";
import { mapLibreContext } from "../context";

export type RSourceProps = SourceSpecification & {
  readonly id: string;
  children?: ReactElement | ReactElement[];
};

function createSource(map: Map, id: string, sourceOptions: SourceSpecification) {
  if (map.style?._loaded) {
    console.log("createSource", id);
    map.addSource(id, sourceOptions);
    return map.getSource(id);
  }
  return undefined;
}

function updateSource(
  source: Source,
  nextOptions: SourceSpecification,
  prevOptions: SourceSpecification,
) {
  // verbose but exhaustive
  switch (nextOptions.type) {
    case "image": {
      // ImageSource -> setCoordinates / updateImage({url, coordinates})
      const prevO = prevOptions as ImageSourceSpecification;
      const nextO = nextOptions as ImageSourceSpecification;

      if (prevO.url !== nextO.url) {
        (source as ImageSource).updateImage({
          url: nextO.url,
          coordinates: nextO.coordinates,
        });
      }
      if (prevO.coordinates !== nextO.coordinates) {
        (source as ImageSource).setCoordinates(nextO.coordinates);
      }

      break;
    }
    case "video": {
      // VideoSource -> setCoordinates
      const prevO = prevOptions as VideoSourceSpecification;
      const nextO = nextOptions as VideoSourceSpecification;

      if (prevO.coordinates !== nextO.coordinates) {
        (source as VideoSource).setCoordinates(nextO.coordinates);
      }
      break;
    }
    case "geojson": {
      // TODO manage updateData ?
      // GeoJSONSource -> setData / updateData / setClusterOptions({ cluster, clusterMaxZoom, clusterRadius })
      const prevO = prevOptions as GeoJSONSourceSpecification;
      const nextO = nextOptions as GeoJSONSourceSpecification;

      if (prevO.data !== nextO.data) {
        (source as GeoJSONSource).setData(nextO.data);
      }

      if (
        prevO.cluster !== nextO.cluster ||
        prevO.clusterMaxZoom !== nextO.clusterMaxZoom ||
        prevO.clusterRadius !== nextO.clusterRadius
      ) {
        (source as GeoJSONSource).setClusterOptions({
          cluster: nextO.cluster,
          clusterMaxZoom: nextO.clusterMaxZoom,
          clusterRadius: nextO.clusterRadius,
        });
      }
      break;
    }
    case "raster":
    case "raster-dem":
    case "vector": {
      // setTiles(tiles: string[]) / setUrl(url)
      const prevO = prevOptions as RasterSourceSpecification;
      const nextO = nextOptions as RasterSourceSpecification;

      if (prevO.tiles !== nextO.tiles && nextO.tiles) {
        (source as RasterTileSource).setTiles(nextO.tiles);
      }

      if (prevO.url !== nextO.url && nextO.url) {
        (source as RasterTileSource).setUrl(nextO.url);
      }

      break;
    }
  }
}

function RSource(props: RSourceProps, ref: Ref<Source | undefined>) {
  const { id, children, ...sourceOptions } = props;
  console.log("Render RSource");

  const context = useContext(mapLibreContext);
  const map = context.mapManager?.map;

  if (!map) {
    throw new Error("use <RSource /> component inside <RMap />");
  }

  const prevOptionsRef = useRef(sourceOptions);
  const initialId = useRef(id);

  if (id !== initialId.current) {
    throw new Error(`RSource id should not change. "${id}" "${initialId.current}"`);
  }
  if (sourceOptions.type !== prevOptionsRef.current.type) {
    throw new Error(
      `RSource type should not change. "${sourceOptions.type}" "${prevOptionsRef.current.type}"`,
    );
  }

  const [, setVersion] = useState(0);

  useEffect(() => {
    console.log("RSource useEffect", map.style._loaded);

    // https://github.com/maplibre/maplibre-gl-js/issues/1835#issuecomment-1310741571
    // explain why setTimeout
    const reRender = () => void setTimeout(() => setVersion((v) => v + 1), 0);

    /**
     * fired when
     *  - new source added/removed
     *  - new layer added/removed
     */
    map.on("styledata", reRender);

    if (map.style._loaded) {
      // in case style is loaded between first render and useEffect call
      // our styledata listener arrives too late we have to force a new
      // render to add our source
      reRender();
    }

    return () => {
      map.off("styledata", reRender);
      if (map.style && map.getSource(id)) {
        // before removing source, remove all layers using this source
        const layers = map.getStyle()?.layers;
        if (layers) {
          for (const layer of layers) {
            // BackgroundLayerSpecification / CustomLayerInterface has not "source"
            // see below: <RSource /> throw error if <RLayer type="background/custom" />
            // inserted as child. so the case cannot happen
            if (
              layer.type !== "background" &&
              (layer as unknown as CustomLayerInterface).type !== "custom" &&
              layer.source === id
            ) {
              map.removeLayer(layer.id);
              context.controlledLayers = context.controlledLayers.filter((id) => id !== layer.id);
            }
          }
        }
        map.removeSource(id);
        context.controlledSources = context.controlledSources.filter((sourceId) => id !== sourceId);
      }
    };
  }, [map, id, context]);

  let source = map.style && map.getSource(id);

  if (source) {
    // console.log("updateSource", id);
    updateSource(source, sourceOptions, prevOptionsRef.current);
  } else {
    source = createSource(map, id, sourceOptions);
    if (source && !context.controlledSources.includes(id)) {
      context.controlledSources.push(id);
    }
  }

  useImperativeHandle(ref, () => source, [source]);

  prevOptionsRef.current = sourceOptions;

  return (
    (source &&
      Children.map(children, (child) => {
        if (child?.props.type === "background" || child?.props.type === "custom") {
          throw new Error(
            "<RLayer /> type background/custom has no source and should not be wrapped into <RSource /> (issue when unmount <RSource />)",
          );
        }
        return child && cloneElement(child, { source: id });
      })) ||
    null
  );
}

export default memo(forwardRef(RSource));
