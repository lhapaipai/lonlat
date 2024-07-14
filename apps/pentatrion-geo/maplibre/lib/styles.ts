import { StyleSpecification } from "maplibre-gl";

export function createRasterStyle(
  wmtsUrl: string[] | string,
  attribution?: string,
  maxZoom?: number,
): StyleSpecification {
  return {
    version: 8,
    sources: {
      "raster-source": {
        type: "raster",
        tiles: Array.isArray(wmtsUrl) ? wmtsUrl : [wmtsUrl],
        tileSize: window.devicePixelRatio < 1.5 ? 256 : 128,
        attribution: attribution || "",
        maxzoom: maxZoom || 19,
      },
    },
    layers: [
      {
        id: "raster-layer",
        type: "raster",
        source: "raster-source",
        minzoom: 0,
        maxzoom: 20,
      },
    ],
    sky: {
      "sky-color": "#38bdf8",
      "fog-color": "#374151",
    },
  };
}
