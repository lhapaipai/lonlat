import "@lonlat/shared/styles/_vite-sandbox.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map, NavigationControl } from "maplibre-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { area } from "@turf/turf";

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
  style: "/styles/ign/PLAN.IGN/standard.json",
});

map.addControl(new NavigationControl());

MapboxDraw.constants.classes.CONTROL_BASE = "maplibregl-ctrl";
MapboxDraw.constants.classes.CONTROL_PREFIX = "maplibregl-ctrl-";
MapboxDraw.constants.classes.CONTROL_GROUP = "maplibregl-ctrl-group";

const drawControl = new MapboxDraw();
map.addControl(drawControl);

map.on("draw.create", updateArea);
map.on("draw.delete", updateArea);
map.on("draw.update", updateArea);

function updateArea(e) {
  const data = drawControl.getAll();
  const answer = document.getElementById("calculated-area")!;
  if (data.features.length > 0) {
    const result = area(data);
    const roundedArea = Math.round(result * 100) / 100;
    answer.innerHTML = `<p><strong>${roundedArea}</strong></p><p>square meters</p>`;
  } else {
    answer.innerHTML = "";
    if (e.type !== "draw.delete") console.log("Use the draw tools to draw a polygon!");
  }
}

map.addLayer({
  type: "circle",
});
