import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 16,
  style: "/styles/ign/PLAN.IGN/standard.json",

  scrollZoom: true,
  boxZoom: false, // ok
  dragRotate: false,
  dragPan: false,
  keyboard: false,
  doubleClickZoom: false, // ok
  touchZoomRotate: false,
  touchPitch: false,
  // cooperativeGestures: true,
  pitchWithRotate: false,
});
