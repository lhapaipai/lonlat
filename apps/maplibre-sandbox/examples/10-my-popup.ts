import "@lonlat/shared/styles/_vite-sandbox.scss";
import "../shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";

import * as maplibre from "maplibre-gl";
import { LLMarker, LLPopup } from "@lonlat/maplibre-ext";

const $map = document.getElementById("map");

const house: maplibre.LngLatLike = [6.4978, 46.0919];
const marignier: maplibre.LngLatLike = [6.499, 46.0918];
const mole: maplibre.LngLatLike = [6.4546, 46.1067];

const map = new maplibre.Map({
  container: $map!,
  // style: "https://demotiles.maplibre.org/style.json", // style URL
  style: "/styles/ign/PLAN.IGN/standard.json",
  center: house,
  zoom: 17,
});

// map.on("load", () => {
//   map.addSource("terrarium", {
//     type: "raster-dem",
//     tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
//     encoding: "terrarium",
//     tileSize: 256,
//   });
//   map.addControl(
//     new maplibre.TerrainControl({
//       source: "terrarium",
//       exaggeration: 1,
//     }),
//   );
//   map.addLayer({
//     id: "hills",
//     type: "hillshade",
//     source: "terrarium",
//     layout: {
//       visibility: "visible",
//     },
//     paint: {
//       "hillshade-exaggeration": 0.25,
//     },
//   });
// });

// new maplibre.Marker().setLngLat(mole).addTo(map);
// new maplibre.Marker().setLngLat(house).addTo(map);
// new maplibre.Marker().setLngLat(marignier).addTo(map);

new LLMarker().setLngLat(marignier).addTo(map);
new LLMarker().setLngLat(house).addTo(map);
new LLMarker().setLngLat(mole).addTo(map);

// const popupWithMarker = new LLPopup({
//   closeButton: true,
//   closeOnClick: true,
// });
// popupWithMarker.setHTML("hello world", "Bienvenue !");

// const popupMole = new LLPopup({
//   closeButton: true,
//   closeOnClick: true,
// });
// popupMole.setHTML("le Môle", "altitude : 1863m !");
// const markerMole = new LLMarker({
//   anchor: "bottom",
// });
// markerMole.setLngLat(mole).setPopup(popupMole).addTo(map);

// const simplePopup = new LLPopup({
//   closeButton: true,
//   closeOnClick: true,
// });
// simplePopup.setHTML("hello world", "Bienvenue !").setLngLat(marignier).addTo(map);
// // simplePopup.trackPointer().setHTML("hello world", "Bienvenue !").addTo(map);

// const marker = new LLMarker();
// marker.setLngLat(house).setPopup(popupWithMarker).addTo(map);
