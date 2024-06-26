import "~/shared/tailwind.css";
import "~/shared/ml-overlay.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";

import * as maplibre from "maplibre-gl";

const $map = document.getElementById("map");

const map = new maplibre.Map({
  container: $map!,
  style: "/assets/styles/ign/PLAN.IGN/toponymes.json",
  center: [6.49, 46.089],
  zoom: 10,
});

map.on("load", () => {
  map.addSource("orthophoto", {
    type: "raster",
    tiles: [
      "https://wxs.ign.fr/essentiels/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIXSET=PM&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&STYLE=normal&FORMAT=image/jpeg",
    ],
    tileSize: 256,
  });

  map.addSource("terrarium", {
    type: "raster-dem",
    tiles: [
      "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
    ],
    encoding: "terrarium",
    tileSize: 256,
  });
  // map.addLayer({
  //   id: "hills",
  //   type: "hillshade",
  //   source: "terrarium",
  //   layout: {
  //     visibility: "visible",
  //   },
  //   paint: {
  //     "hillshade-exaggeration": 0.25,
  //   },
  // });
  map.addLayer(
    {
      id: "orthophoto",
      type: "raster",
      source: "orthophoto",
      minzoom: 0,
      maxzoom: 20,
    },
    "Chemin souterrain - piste cyclable",
  );

  // map.setTerrain({
  //   source: "terrarium",
  //   exaggeration: 1,
  // });

  map.addControl(
    new maplibre.TerrainControl({
      source: "terrarium",
      exaggeration: 1,
    }),
  );
});
