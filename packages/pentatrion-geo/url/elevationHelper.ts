import { RasterDEMSourceSpecification } from "maplibre-gl";

export const terrainTerrariumSource: RasterDEMSourceSpecification = {
  type: "raster-dem",
  tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
  encoding: "terrarium",
  tileSize: 256,
};

export const terrainMapTilerSource: (maptilerToken: string) => RasterDEMSourceSpecification = (
  maptilerToken: string,
) => ({
  type: "raster-dem",
  url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${maptilerToken}`,
  tileSize: 256,
});

export const hillShadedFromTerrain: (maptilerToken: string) => RasterDEMSourceSpecification = (
  maptilerToken: string,
) => ({
  type: "raster-dem",
  url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${maptilerToken}`,
  tileSize: 256,
});

export const hillshadeSource: (maptilerToken: string) => RasterDEMSourceSpecification = (
  maptilerToken: string,
) => ({
  // ne fonctionne pas
  type: "raster-dem",
  url: `https://api.maptiler.com/tiles/hillshade/tiles.json?key=${maptilerToken}`,
  tileSize: 256,
});
