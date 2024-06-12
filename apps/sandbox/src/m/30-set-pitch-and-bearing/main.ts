import "../../main.css";
import "~/shared/main.css";
import "maplibre-react-components/dist/maplibre-gl.css";
import "maplibre-react-components/dist/mrc.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
  // pitch: 60,
  bearing: -60,
});
