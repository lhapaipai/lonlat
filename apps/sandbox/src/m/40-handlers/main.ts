import "~/shared/tailwind.css";
import "~/shared/ml-overlay.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

new Map({
  container: $map,
  center: marignier,
  zoom: 16,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",

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
