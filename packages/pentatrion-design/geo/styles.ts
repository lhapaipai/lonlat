export function createRasterStyle(wmtsUrl: string) {
  return {
    version: 8,
    sources: {
      orthophoto: {
        type: "raster",
        tiles: [wmtsUrl],
        tileSize: 256,
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
