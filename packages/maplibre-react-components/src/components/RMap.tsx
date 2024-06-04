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
  useState,
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
    afterInstanciation?: (map: Map) => void;
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
    afterInstanciation,
    mapStyle,
    styleDiffing,
    padding,
    ...mapProps
  }: RMapProps,
  ref: Ref<Map>,
) {
  const [mapManager, setMapManager] = useState<MapManager | null>(null);
  const containerRef = useRef<HTMLDivElement>(null!);

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
    const mapManager = new MapManager(
      { mapStyle, styleDiffing, padding },
      mapProps,
      containerRef.current,
    );

    maplibreRef.current.mapManager = mapManager;

    afterInstanciation && afterInstanciation(mapManager.map);

    setMapManager(mapManager);

    return () => {
      mapManager.destroy();
    };
    // map reactivity is managed inside useLayoutEffect setProps (below)
    // we don't want to destroy/re-instanciate a MapManager instance in each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (mapManager) {
      mapManager.setProps({ mapStyle, styleDiffing, padding }, mapProps, maplibreRef.current);
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
      {mapManager && (
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
