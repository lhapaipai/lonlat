import { ReactNode, useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import * as maplibre from "maplibre-gl";
import { MapContext } from "./useMapContext";

interface Props {
  children?: ReactNode;
  onReady?: (map: maplibre.Map) => void;
  onDestroy?: () => void;
}
export default function RMap({ children, onReady = () => {}, onDestroy = () => {} }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibre.Map | null>(null);
  const [mapAvailable, setMapAvailable] = useState(false);

  useEffect(() => {
    if (!mapRef.current) {
      throw new Error("mapRef is not assigned");
    }

    if (mapInstance.current === null) {
      mapInstance.current = new maplibre.Map({
        container: mapRef.current,
        style: "https://demotiles.maplibre.org/style.json", // style URL
        center: [5, 45],
        zoom: 4,
      });
      onReady(mapInstance.current);
    }
    setMapAvailable(true);
    return () => {
      if (mapInstance.current !== null) {
        mapInstance.current.remove();
        mapInstance.current = null;
        setMapAvailable(false);
        onDestroy();
      }
    };
  }, []);

  return (
    <>
      <div id="map" ref={mapRef}></div>
      {mapAvailable && (
        <MapContext.Provider value={mapInstance.current}>{children}</MapContext.Provider>
      )}
    </>
  );
}
