import "~/shared/tailwind.css";
import "~/shared/ml-overlay.css";
import "./style.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { LngLatLike, Map, NavigationControl } from "maplibre-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { area } from "@turf/turf";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
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

function updateArea(e: any) {
  const data = drawControl.getAll();
  const answer = document.getElementById("calculated-area")!;
  if (data.features.length > 0) {
    const result = area(data);
    const roundedArea = Math.round(result * 100) / 100;
    answer.innerHTML = `<p><strong>${roundedArea}</strong></p><p>square meters</p>`;
  } else {
    answer.innerHTML = "";
    if (e.type !== "draw.delete")
      console.log("Use the draw tools to draw a polygon!");
  }
}
