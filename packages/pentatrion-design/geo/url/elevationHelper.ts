import { RasterDEMSourceSpecification } from "maplibregl-js";

export const terrainTerrariumSource: RasterDEMSourceSpecification = {
  type: "raster-dem",
  tiles: ["	https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
  encoding: "terrarium",
  tileSize: 256,
};
export const terrainMapTilerSource = {
  type: "raster-dem",
  url: "https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=5MBwnNxTfGUDJh3LabgI",
  tileSize: 256,
};
export const hillShadedFromTerrain = {
  type: "raster-dem",
  url: "https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=5MBwnNxTfGUDJh3LabgI",
  tileSize: 256,
};
export const hillshadeSource = {
  // ne fonctionne pas
  type: "raster-dem",
  url: "https://api.maptiler.com/tiles/hillshade/tiles.json?key=5MBwnNxTfGUDJh3LabgI",
  tileSize: 256,
};
