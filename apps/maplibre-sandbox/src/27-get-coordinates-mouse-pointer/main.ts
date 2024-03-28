import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map } from "maplibre-gl";
import { DOM } from "maplibre-gl/src/util/dom";
const $map = document.getElementById("map")!;
const $info = document.getElementById("info") as HTMLSpanElement;

const marignier: LngLatLike = [6.498, 46.089];

let map: Map | null = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/styles/ign/PLAN.IGN/standard.json",
});

map.on("mousemove", (e) => {
  const pointStr1 = JSON.stringify(e.point);
  const pointStr2 = JSON.stringify(DOM.mousePos(map.getCanvasContainer(), e.originalEvent));
  const lngLatStr1 = e.lngLat.wrap();
  const lngLatStr2 = map?.unproject(e.point).wrap();

  $info.innerHTML = `${pointStr1}<br />${pointStr2}<br />${lngLatStr1}<br />${lngLatStr2}`;
});

const $destroy = document.getElementById("destroy") as HTMLButtonElement;
$destroy.addEventListener("click", () => {
  if (map) {
    map.remove();
    map = null;
  }
});
