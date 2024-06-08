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
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  useContext,
  memo,
  useCallback,
} from "react";
import { mapLibreContext } from "../context";

export type RSourceProps = SourceSpecification & {
  readonly id: string;
};

function createSource(map: Map, id: string, sourceOptions: SourceSpecification) {
  // source can't be added if style is not loaded
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
  console.log("updateSource", source.id);
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

export const RSource = memo(
  forwardRef<Source | undefined, RSourceProps>(function RSource(props, ref) {
    console.time("rsource");
    const { id, ...sourceOptions } = props;
    console.log("Render RSource", id);

    const context = useContext(mapLibreContext);
    const map = context.mapManager?.map;

    if (!map) {
      throw new Error("use <RSource /> component inside <RMap />");
    }

    const prevOptionsRef = useRef(sourceOptions);
    const initialId = useRef(id);

    if (id !== initialId.current) {
      throw new Error(
        `RSource id should not change. "${id}" "${initialId.current}". If you defined id as const string add a "key" prop to your RSource component`,
      );
    }
    if (sourceOptions.type !== prevOptionsRef.current.type) {
      throw new Error(
        `RSource type should not change. "${sourceOptions.type}" "${prevOptionsRef.current.type}"`,
      );
    }

    const [, setVersion] = useState(0);

    // https://github.com/maplibre/maplibre-gl-js/issues/1835#issuecomment-1310741571
    // explain why setTimeout
    const reRender = useCallback(() => void setTimeout(() => setVersion((v) => v + 1), 0), []);

    useEffect(() => {
      console.log("RSource useEffect", map.style._loaded);

      /**
       * fired when
       *  - new source added/removed
       *  - new layer added/removed
       *  when event is fired map.style._loaded is always true
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
          context.controlledSources = context.controlledSources.filter(
            (sourceId) => id !== sourceId,
          );
        }
      };
    }, [map, id, context, reRender]);

    let source = map.style?._loaded && map.getSource(id);

    if (source) {
      // console.log("updateSource", id);
      updateSource(source, sourceOptions, prevOptionsRef.current);
    } else {
      source = createSource(map, id, sourceOptions);
      if (source && !context.controlledSources.includes(id)) {
        context.controlledSources.push(id);
      }
      map.off("styledata", reRender);
    }

    useImperativeHandle(ref, () => source, [source]);

    prevOptionsRef.current = sourceOptions;
    console.timeEnd("rsource");

    return null;
  }),
);
