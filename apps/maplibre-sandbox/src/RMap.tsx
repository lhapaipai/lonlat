import { ReactNode, useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import * as maplibre from "maplibre-gl";
import { MapContext } from "./useMapContext";

interface Props {
  children?: ReactNode;
}
export default function RMap({ children }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibre.Map | null>(null);
  const [mapAvailable, setMapAvailable] = useState(false);

  useEffect(() => {
    if (mapInstance.current === null) {
      mapInstance.current = new maplibre.Map({
        container: mapRef.current!,
        style: "https://demotiles.maplibre.org/style.json", // style URL
        center: [5, 45],
        zoom: 4,
      });
    }
    setMapAvailable(true);
    return () => {
      if (mapInstance.current !== null) {
        mapInstance.current.remove();
        mapInstance.current = null;
        setMapAvailable(false);
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
