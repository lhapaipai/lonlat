import { Map, Source, SourceSpecification } from "maplibre-gl";
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
} from "react";
import { RLayer, useMap } from "..";

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
  sourceId: string,
  sourceOptions: SourceSpecification,
  prevProps: RSourceProps,
) {
  if (sourceId !== prevProps.id || sourceOptions.type !== prevProps.type) {
    console.error(
      "RSource id / type should not change. If add/remove multiple JSX sources dynamically, make sure you use React's key prop to give each element a stable identity",
      prevProps.id,
      sourceId,
      prevProps.type,
      sourceOptions.type,
    );
    return;
  }

  const changedKeys: string[] = [];
  let changedKeyCount = 0;

  for (const key of Object.keys(sourceOptions)) {
    if (prevProps[key] !== sourceOptions[key]) {
      changedKeys.push(key);
      changedKeyCount++;
    }
  }

  if (!changedKeyCount) {
    return;
  }

  console.log(`update Rsource ${sourceId}`, changedKeys);

  changedKeys.forEach((key) => {
    const setter = `set${key[0].toUpperCase()}${key.substring(1)}`;
    if (setter in source && typeof source[setter] === "function") {
      source[setter](sourceOptions[key]);
    } else {
      console.warn(`Unable to update <RSource> prop: ${key} no setter : ${setter}`);
    }
  });
}

function RSource(props: RSourceProps, ref: Ref<Source | undefined>) {
  const { id, children, ...sourceOptions } = props;

  const map = useMap();

  // we don't want sourceId to change during the RSource lifecycle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sourceId = useMemo(() => id || `inline-source-${uniqueId()}`, []);

  const prevPropsRef = useRef({
    ...sourceOptions,
    id: sourceId,
  });

  const [, setVersion] = useState(0);

  useEffect(() => {
    // https://github.com/maplibre/maplibre-gl-js/issues/1835#issuecomment-1310741571
    // explain why setTimeout
    const reRender = () => setTimeout(() => setVersion((v) => v + 1), 0);
    map.on("styledata", reRender);

    // in case style is loaded between first render and useEffect call
    reRender();

    return () => {
      map.off("styledata", reRender);
      if (map.style && map.style._loaded && map.getSource(sourceId)) {
        const layers = map.getStyle()?.layers;
        if (layers) {
          for (const layer of layers) {
            // BackgroundLayerSpecification has not "source"
            // TODO throw error if insert Background type inside <RSource />
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
    updateSource(source, sourceId, sourceOptions, prevPropsRef.current);
  } else {
    source = createSource(map, sourceId, sourceOptions);
  }

  useImperativeHandle(ref, () => source, [source]);

  prevPropsRef.current = {
    ...sourceOptions,
    id: sourceId,
  };

  return (
    (source &&
      Children.map(children, (child) => {
        if (child?.type !== RLayer) {
          console.log("RSource accept only <RLayer /> as Children");
          return child;
        }
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
