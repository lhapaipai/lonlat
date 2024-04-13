import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";

import { Map, LngLatLike, Marker, MapLibreEvent } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  // style: "https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
  // center: marignier,
  // zoom: 15,
  // style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  // zoom: 0.3,
  // center: [0, 20],
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

const marker = new Marker({
  draggable: true,
})
  .setLngLat([marignier[0], marignier[1]])
  .addTo(map);

map.on("click", (e) => {});

marker.on("dragstart", (e) => {
  const a = e.target instanceof Map;
  const b = e.target instanceof Marker;
  debugger;
  const evt = e as MapLibreEvent<MouseEvent>;
});
