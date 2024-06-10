"use client";

import { Map } from "maplibre-gl";
import {
  CSSProperties,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import MapManager, { ManagerOptions, MapProps } from "../lib/MapManager";
import { MapLibreContext, mapLibreContext } from "../context";
import { useIsomorphicLayoutEffect } from "../hooks/useIsomorphicLayoutEffect";

type RMapComponentProps = {
  children?: ReactNode;
  style?: CSSProperties;
  id?: string;
  className?: string;
  onMounted?: (map: Map) => void;
};

type RMapProps = MapProps & ManagerOptions & RMapComponentProps;

const childContainerStyle = {
  height: "100%",
};

export const RMap = forwardRef<Map | undefined, RMapProps>(function RMap(
  {
    /* RMapProps */
    children,
    style,
    id,
    className,
    onMounted,

    /* ManagerOptions */
    mapStyle,
    styleDiffing,
    styleTransformStyle,
    padding,

    /* MapProps */
    ...mapProps
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null!);

  const maplibreRef = useRef<MapLibreContext>({
    mapManager: undefined,
  });

  const needPropsUpdate = useRef(true);

  const [, reRender] = useState(0);

  /**
   * we need to init maplibreRef.current.mapManager before useImperativeHandle call
   * so necessary inside useLayoutEffect
   * (useLayoutEffect and useImperativeHandle are called in same priority)
   * parent component will have access to reference in useLayoutEffect / useEffect hooks
   */
  useIsomorphicLayoutEffect(() => {
    if (!maplibreRef.current.mapManager) {
      maplibreRef.current.mapManager = new MapManager(
        { mapStyle, styleDiffing, padding },
        mapProps,
        containerRef.current,
      );

      onMounted && onMounted(maplibreRef.current.mapManager.map);
      reRender((v) => v + 1);
      needPropsUpdate.current = false;
    } else {
      if (needPropsUpdate.current) {
        // console.log("mapManager setProps");
        maplibreRef.current.mapManager.setProps(
          { mapStyle, padding, styleDiffing, styleTransformStyle },
          mapProps,
        );
      } else {
        needPropsUpdate.current = true;
      }
    }
  });

  useIsomorphicLayoutEffect(() => {
    return () => {
      if (maplibreRef.current.mapManager) {
        maplibreRef.current.mapManager.destroy();
        maplibreRef.current.mapManager = undefined;
      }
    };
  }, []);

  useImperativeHandle(ref, () => maplibreRef.current.mapManager?.map, []);

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
});
