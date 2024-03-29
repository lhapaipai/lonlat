import { Map, Map, MapOptions, StyleSpecification } from "maplibre-gl";
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

import MapManager, { MapManagerOptions } from "../lib/MapManager";

const childrenContainerStyle: CSSProperties = {
  height: "100%",
};

export const MapContext = createContext<MapManager | null>(null);

type MapProps = MapManagerOptions & {
  children?: ReactNode;
  style?: CSSProperties;
  id?: string;
  className?: string;
};

const RMap = forwardRef<Map, MapProps>(
  ({ children, style, id, className, ...mapManagerProps }: MapProps, ref) => {
    const [mapManager, setMapManager] = useState<MapManager | null>(null);
    const containerRef = useRef<HTMLDivElement>(null!);
    const mapRef = useRef<Map>(null!);

    useEffect(() => {
      const mapManagerInstance = new MapManager(mapManagerProps, containerRef.current);

      mapRef.current = mapManagerInstance.map;
      setMapManager(mapManagerInstance);

      return () => {
        mapManagerInstance.destroy();
      };
      // mapManagerProps sync is managed inside useLayoutEffect
      // we don't want to destroy/recreate a MapManager instance
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
      if (mapManager) {
        mapManager.setProps(mapManagerProps);
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
