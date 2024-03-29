import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/styles/ign/PLAN.IGN/standard-geopf.json",
  // pitch: 60,
  bearing: -60,
});
