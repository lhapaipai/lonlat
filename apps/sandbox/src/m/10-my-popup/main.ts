import "../../main.css";
import "~/shared/main.css";
import "maplibre-theme/dist/default.css";
import "maplibre-react-components/dist/mrc.css";

import * as maplibre from "maplibre-gl";
import { Marker } from "pentatrion-geo";

const $map = document.getElementById("map");

const house: maplibre.LngLatLike = [6.4978, 46.0919];
const marignier: maplibre.LngLatLike = [6.499, 46.0918];
const mole: maplibre.LngLatLike = [6.4546, 46.1067];

const map = new maplibre.Map({
  container: $map!,
  // style: "https://demotiles.maplibre.org/style.json", // style URL
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
  center: house,
  zoom: 16,
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

new Marker().setLngLat(house).addTo(map);
new Marker().setLngLat(marignier).addTo(map);
new Marker().setLngLat(mole).addTo(map);

for (let a = 0; a < 100; a++) {
  new Marker()
    .setLngLat([
      house[0] + (Math.random() - 0.5) * 0.05,
      house[1] + (Math.random() - 0.5) * 0.05,
    ])
    .addTo(map);
}

// const popupWithMarker = new Popup({
//   closeButton: true,
//   closeOnClick: true,
// });
// popupWithMarker.setHTML("hello world", "Bienvenue !");

// const popupMole = new Popup({
//   closeButton: true,
//   closeOnClick: true,
// });
// popupMole.setHTML("le Môle", "altitude : 1863m !");
// const markerMole = new Marker({
//   anchor: "bottom",
// });
// markerMole.setLngLat(mole).setPopup(popupMole).addTo(map);

// const simplePopup = new Popup({
//   closeButton: true,
//   closeOnClick: true,
// });
// simplePopup.setHTML("hello world", "Bienvenue !").setLngLat(marignier).addTo(map);
// // simplePopup.trackPointer().setHTML("hello world", "Bienvenue !").addTo(map);

// const marker = new Marker();
// marker.setLngLat(house).setPopup(popupWithMarker).addTo(map);
