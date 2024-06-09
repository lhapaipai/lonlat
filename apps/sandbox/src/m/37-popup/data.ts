// style: "/assets/styles/ign/PLAN.IGN/standard.json",

import { StyleSpecification } from "maplibre-gl";

// style: "/assets/styles/ign/elevation.json",
export const terrainStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
    // Use a different source for terrain and hillshade layers, to improve render quality
    elevation: {
      type: "raster-dem",
      tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
      encoding: "terrarium",
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
    // {
    //   id: "hills",
    //   type: "hillshade",
    //   source: "elevation",
    //   layout: { visibility: "visible" },
    //   paint: { "hillshade-shadow-color": "#473B24" },
    // },
  ],
  // terrain: {
  //   source: "elevation",
  //   exaggeration: 1,
  // },
};
