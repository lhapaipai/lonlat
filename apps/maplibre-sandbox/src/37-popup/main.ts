import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import "./maplibre-gl.css";
import { LngLatLike, Map, Marker, Popup, TerrainControl } from "maplibre-gl";
import "./style.css";
import { terrainStyle } from "./data";
import { LLMarker, LLPopup } from "maplibre-components";

const $map = document.getElementById("map")!;

const marignier1: LngLatLike = [6.498, 46.089];
const marignier2: LngLatLike = [6.508, 46.089];
const marignier3: LngLatLike = [6.478, 46.089];
const marignier4: LngLatLike = { lng: 6.497802059919962, lat: 46.091824501717326 };
const map = new Map({
  container: $map,
  center: marignier1,
  zoom: 14,
  style: terrainStyle,
});

map.addControl(new TerrainControl({ source: "elevation" }));

const popup1 = new LLPopup({
  closeOnClick: false,
  closeButton: true,
})
  // .trackPointer()
  // .setLngLat(marignier1)
  .setHTML(`<div>Hello world</div>`);
// .addTo(map);

const marker1 = new LLMarker({
  // offset: [0, 0],
  // pitchAlignment: "viewport",
})
  .setLngLat(marignier4)
  .setPopup(popup1)
  .addTo(map);

const point = document.getElementById("point");
new Marker({
  element: point,
  offset: [0, 0],
})
  .setLngLat(marignier4)
  .addTo(map);

const popup2 = new LLPopup({
  closeOnClick: false,
  closeButton: true,
})
  // .setLngLat(marignier2)
  .setHTML(
    `<div>Hello world lorem ipsum  world lorem ipsum  world lorem ipsum  world lorem ipsum </div>`,
    "Infos point",
  )
  .addTo(map);

const marker2 = new Marker().setLngLat(marignier2).addTo(map);

const popup3 = new LLPopup({
  closeOnClick: false,
  closeButton: true,
})
  // .trackPointer()
  // .setLngLat(marignier3)
  .setHTML(
    `<div>Hello world lorem ipsum  world lorem ipsum  world lorem ipsum  world lorem ipsum </div>`,
    "Infos point",
  );

// .setPopup(popup2)
const marker3 = new Marker().setLngLat(marignier3).setPopup(popup3).addTo(map);

map.on("click", (e) => {
  console.log(e.lngLat);
});
