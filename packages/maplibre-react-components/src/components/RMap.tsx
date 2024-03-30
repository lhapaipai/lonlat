import { Map } from "maplibre-gl";
import {
  CSSProperties,
  ReactNode,
  createContext,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import MapManager, { ManagerOptions, MapProps } from "../lib/MapManager";

const childrenContainerStyle: CSSProperties = {
  height: "100%",
};

export const MapContext = createContext<MapManager | null>(null);

type RMapProps = MapProps &
  ManagerOptions & {
    children?: ReactNode;
    style?: CSSProperties;
    id?: string;
    className?: string;
  };

const RMap = forwardRef<Map, RMapProps>(
  (
    { children, style, id, className, mapStyle, styleDiffing, padding, ...mapProps }: RMapProps,
    ref,
  ) => {
    const [mapManager, setMapManager] = useState<MapManager | null>(null);
    const containerRef = useRef<HTMLDivElement>(null!);
    const mapRef = useRef<Map>(null!);

    // we need to instanciate mapRef before useImperativeHandle call
    // so necessary inside useLayoutEffect
    // (useLayoutEffect and useImperativeHandle are called in same priority)
    // parent component will have access to reference in useLayoutEffect / useEffect hooks
    useLayoutEffect(() => {
      const mapManagerInstance = new MapManager(
        { mapStyle, styleDiffing, padding },
        mapProps,
        containerRef.current,
      );

      mapRef.current = mapManagerInstance.map;
      setMapManager(mapManagerInstance);

      return () => {
        mapManagerInstance.destroy();
      };
      // map reactivity is managed inside useLayoutEffect setProps (below)
      // we don't want to destroy/re-instanciate a MapManager instance in each render
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
      if (mapManager) {
        mapManager.setProps({ mapStyle, styleDiffing, padding }, mapProps);
      }
    });

    useImperativeHandle(ref, () => mapRef.current, []);

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
          <MapContext.Provider value={mapManager}>
            <div data-rmap-children style={childrenContainerStyle}>
              {children}
            </div>
          </MapContext.Provider>
        )}
      </div>
    );
  },
);

export default RMap;
