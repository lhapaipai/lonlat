import { Map } from "maplibre-gl";
import {
  CSSProperties,
  ReactNode,
  createContext,
  forwardRef,
  useEffect,
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

    useEffect(() => {
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
      // mapManagerOptions sync is managed inside useLayoutEffect
      // we don't want to destroy/recreate a MapManager instance
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
      if (mapManager) {
        mapManager.setProps({ mapStyle, styleDiffing, padding }, mapProps);
      }
    });

    useImperativeHandle(ref, () => mapRef.current, [mapManager]);

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
