import {
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
  useMemo,
  useRef,
  useState,
  Ref,
  useImperativeHandle,
  memo,
} from "react";
import { useMap } from "..";

export type RSourceProps = SourceSpecification & {
  id?: string;
  children?: ReactElement | ReactElement[];
};

let id = 1;

function uniqueId(): number {
  return id++;
}

function createSource(map: Map, sourceId: string, sourceOptions: SourceSpecification) {
  if (map.style && map.style._loaded) {
    console.log("createSource", sourceId);
    map.addSource(sourceId, sourceOptions);
    return map.getSource(sourceId);
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
      } else if (prevO.coordinates !== nextO.coordinates) {
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
      break;
    }
  }
}

function RSource(props: RSourceProps, ref: Ref<Source | undefined>) {
  const { id, children, ...sourceOptions } = props;
  console.log("Render RSource");
  const map = useMap();

  // we don't want sourceId to change during the RSource lifecycle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sourceId = useMemo(() => id || `inline-source-${uniqueId()}`, []);

  const prevOptionsRef = useRef(sourceOptions);
  const initialSourceId = useRef(sourceId);

  if (sourceId !== initialSourceId.current) {
    throw new Error(`RSource id should not change. "${sourceId}" "${initialSourceId.current}"`);
  }
  if (sourceOptions.type !== prevOptionsRef.current.type) {
    throw new Error(
      `RSource type should not change. "${sourceOptions.type}" "${prevOptionsRef.current.type}"`,
    );
  }

  const [, setVersion] = useState(0);

  useEffect(() => {
    // https://github.com/maplibre/maplibre-gl-js/issues/1835#issuecomment-1310741571
    // explain why setTimeout
    const reRender = () => setTimeout(() => setVersion((v) => v + 1), 0);
    map.on("styledata", reRender);

    if (map.style._loaded) {
      // in case style is loaded between first render and useEffect call
      // our styledata listener arrives too late we have to force a new
      // render to add our source
      reRender();
    }

    return () => {
      map.off("styledata", reRender);
      if (map.style && map.style._loaded && map.getSource(sourceId)) {
        const layers = map.getStyle()?.layers;
        if (layers) {
          for (const layer of layers) {
            // BackgroundLayerSpecification / CustomLayerInterface has not "source"
            // see below: <RSource /> throw error if <RLayer type="background/custom" />
            // inserted as child. so the case cannot happen
            if (layer.type !== "background" && layer.source === sourceId) {
              map.removeLayer(layer.id);
            }
          }
        }
        map.removeSource(sourceId);
      }
    };
  }, [map, sourceId]);

  let source = map.style && map.getSource(sourceId);

  if (source) {
    updateSource(source, sourceOptions, prevOptionsRef.current);
  } else {
    source = createSource(map, sourceId, sourceOptions);
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
        return child && cloneElement(child, { source: sourceId });
      })) ||
    null
  );
}

export default forwardRef(RSource);
