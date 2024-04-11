import { StyleSpecification } from "maplibre-gl";

export function createRasterStyle(
  wmtsUrl: string[] | string,
  attribution?: string,
): StyleSpecification {
  return {
    version: 8,
    sources: {
      orthophoto: {
        type: "raster",
        tiles: Array.isArray(wmtsUrl) ? wmtsUrl : [wmtsUrl],
        tileSize: 256,
        attribution,
      },
    },
    layers: [
      {
        id: "orthophoto",
        type: "raster",
        source: "orthophoto",
        minzoom: 0,
        maxzoom: 20,
      },
    ],
  };
}
