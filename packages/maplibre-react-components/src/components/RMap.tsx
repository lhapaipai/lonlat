"use client";

import { Map } from "maplibre-gl";
import {
  CSSProperties,
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import MapManager, { ManagerOptions, MapProps } from "../lib/MapManager";
import { MapLibreContext, mapLibreContext } from "../context";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";

type RMapProps = MapProps &
  ManagerOptions & {
    children?: ReactNode;
    style?: CSSProperties;
    id?: string;
    className?: string;
    onMounted?: (map: Map) => void;
  };

const childContainerStyle = {
  height: "100%",
};

function RMap(
  {
    children,
    style,
    id,
    className,
    onMounted,
    mapStyle,
    styleDiffing,
    padding,
    ...mapProps
  }: RMapProps,
  ref: Ref<Map>,
) {
  console.log("render RMap");
  const containerRef = useRef<HTMLDivElement>(null!);
  const mapHasOriginalProps = useRef(true);

  const maplibreRef = useRef<MapLibreContext>({
    mapManager: null!,
    controlledSources: [],
    controlledLayers: [],
    controlledTerrain: false,
  });
  // we need to init maplibreRef.current.mapManager before useImperativeHandle call
  // so necessary inside useLayoutEffect
  // (useLayoutEffect and useImperativeHandle are called in same priority)
  // parent component will have access to reference in useLayoutEffect / useEffect hooks
  useIsomorphicLayoutEffect(() => {
    console.log("useIsomorphicLayoutEffect init");
    const mapManager = new MapManager(
      { mapStyle, styleDiffing, padding },
      mapProps,
      containerRef.current,
    );
    mapHasOriginalProps.current = true;
    maplibreRef.current.mapManager = mapManager;

    onMounted && onMounted(mapManager.map);

    return () => {
      mapManager.destroy();
    };
    // map reactivity is managed inside useLayoutEffect setProps (below)
    // we don't want to destroy/re-instanciate a MapManager instance in each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (maplibreRef.current.mapManager) {
      if (mapHasOriginalProps.current) {
        mapHasOriginalProps.current = false;
      } else {
        console.log("useIsomorphicLayoutEffect setProps");
        maplibreRef.current.mapManager.setProps(
          { mapStyle, styleDiffing, padding },
          mapProps,
          maplibreRef.current,
        );
      }
    }
  });

  useImperativeHandle(ref, () => maplibreRef.current.mapManager.map, []);

  const completeStyle: CSSProperties = useMemo(
    () => ({
      position: "relative",
      width: "100%",
      height: "100%",
      ...style,
    }),
    [style],
  );

  return (
    <div ref={containerRef} id={id} className={className} style={completeStyle}>
      {maplibreRef.current.mapManager && (
        <mapLibreContext.Provider value={maplibreRef.current}>
          <div className="maplibregl-children" style={childContainerStyle}>
            {children}
          </div>
        </mapLibreContext.Provider>
      )}
    </div>
  );
}

export default forwardRef(RMap);
