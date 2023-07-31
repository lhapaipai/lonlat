import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import * as maplibre from "maplibre-gl";
import { MapContext } from "./useMapContext";

interface Props {
  children?: ReactNode;
  style?: CSSProperties;
  onReady?: (map: maplibre.Map) => void;
  onDestroy?: () => void;
}
export default function RMap({
  children,
  style = {},
  onReady = () => {},
  onDestroy = () => {},
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibre.Map | null>(null);
  const [mapAvailable, setMapAvailable] = useState(false);

  useEffect(() => {
    if (!containerRef.current) {
      throw new Error("containerRef is not assigned");
    }

    if (mapRef.current === null) {
      console.log("initialize maplibre");
      mapRef.current = new maplibre.Map({
        container: containerRef.current,
        style: "https://demotiles.maplibre.org/style.json", // style URL
        center: [5, 45],
        zoom: 4,
      });
      onReady(mapRef.current);
    }
    setMapAvailable(true);
    return () => {
      if (mapRef.current !== null) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapAvailable(false);
        onDestroy();
      }
    };
  }, []);

  return (
    <>
      <div id="map" ref={containerRef} style={style}></div>
      {mapAvailable && <MapContext.Provider value={mapRef.current}>{children}</MapContext.Provider>}
    </>
  );
}
