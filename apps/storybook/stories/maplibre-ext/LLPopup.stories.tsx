import { useEffect, useRef } from "react";
import * as maplibre from "maplibre-gl";
import { LLPopup } from "@lonlat/maplibre-ext";
import "maplibre-gl/dist/maplibre-gl.css";

const meta = {
  title: "Maplibre-ext/LLPopup",
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

    new LLPopup({
      closeButton: true,
      closeOnClick: false,
      closeOnMove: false,
      focusAfterOpen: false,
      maxWidth: "300px",
    })
      .setLngLat([-1.1344, 44.698])
      .setHTML("Hello world", "Bassin d'arcachon")
      .addTo(map);

    new LLPopup({
      closeButton: false,
      closeOnClick: true,
      closeOnMove: false,
      focusAfterOpen: false,
      maxWidth: "300px",
    })
      .setLngLat([-1.1344, 39])
      .setHTML("Hello world")
      .addTo(map);
  }, []);
  return (
    <div ref={containerRef} style={{ height: "var(--storybook-preview-viewport-height)" }}></div>
  );
};

export const TrackPointer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new maplibre.Map({
      container: containerRef.current!,
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [5, 45],
      zoom: 4,
    });

    new LLPopup({
      closeButton: false,
      closeOnClick: false,
    })
      .trackPointer()
      .setHTML("<div>Hello world</div>")
      .addTo(map);
  }, []);
  return (
    <div ref={containerRef} style={{ height: "var(--storybook-preview-viewport-height)" }}></div>
  );
};
