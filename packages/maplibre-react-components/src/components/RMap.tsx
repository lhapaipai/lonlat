import { Map } from "maplibre-gl";
import {
  CSSProperties,
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import MapManager, { ManagerOptions, MapProps } from "../lib/MapManager";
import { MapLibreContext, mapLibreContext } from "../context";
import { createPortal } from "react-dom";

type RMapProps = MapProps &
  ManagerOptions & {
    children?: ReactNode;
    style?: CSSProperties;
    id?: string;
    className?: string;
    afterInstanciation?: (map: Map) => void;
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
  const childrenContainerRef = useRef<HTMLDivElement>();

  if (!childrenContainerRef.current) {
    const elt = document.createElement("div");
    elt.style.height = "100%";
    childrenContainerRef.current = elt;
  }

  const maplibreRef = useRef<MapLibreContext>({
    map: null!,
    controlledSources: [],
    controlledLayers: [],
    controlledTerrain: false,
  });
  // we need to init maplibreRef.current.map before useImperativeHandle call
  // so necessary inside useLayoutEffect
  // (useLayoutEffect and useImperativeHandle are called in same priority)
  // parent component will have access to reference in useLayoutEffect / useEffect hooks
  useLayoutEffect(() => {
    const childrenContainer = childrenContainerRef.current;

    const mapManagerInstance = new MapManager(
      { mapStyle, styleDiffing, padding },
      mapProps,
      containerRef.current,
    );

    if (childrenContainer && !childrenContainer.parentElement) {
      containerRef.current.append(childrenContainer);
    }

    maplibreRef.current.map = mapManagerInstance.map;

    afterInstanciation && afterInstanciation(mapManagerInstance.map);

    setMapManager(mapManagerInstance);

    return () => {
      mapManagerInstance.destroy();
      childrenContainer && childrenContainer.remove();
    };
    // map reactivity is managed inside useLayoutEffect setProps (below)
    // we don't want to destroy/re-instanciate a MapManager instance in each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (mapManager) {
      mapManager.setProps({ mapStyle, styleDiffing, padding }, mapProps, maplibreRef.current);
    }
  });

  useImperativeHandle(ref, () => maplibreRef.current.map, []);

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
      {mapManager &&
        createPortal(
          <mapLibreContext.Provider value={maplibreRef.current}>
            {children}
          </mapLibreContext.Provider>,
          childrenContainerRef.current,
        )}
    </div>
  );
}

export default forwardRef(RMap);
