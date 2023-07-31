import { useEffect, useRef } from "react";
import * as maplibre from "maplibre-gl";
import { LLMarker } from "@lonlat/maplibre-ext";
const meta = {
  title: "Maplibre-ext/LLMarker",
};
export default meta;

export const Basic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new maplibre.Map({
      container: containerRef.current!,
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [5, 45],
      zoom: 4,
    });

    new LLMarker().setLngLat([5, 45]).addTo(map);
  }, []);
  return (
    <div ref={containerRef} style={{ height: "var(--storybook-preview-viewport-height)" }}></div>
  );
};
