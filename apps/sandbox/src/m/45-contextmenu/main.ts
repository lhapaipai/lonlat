import "~/shared/tailwind.css";
import "./main.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

map.on("contextmenu", (ev) => {
  console.log("map.contextmenu", ev);
});

document.documentElement.addEventListener("contextmenu", (ev) => {
  console.log("document.contextmenu", ev);
});

map.getContainer().addEventListener("contextmenu", (ev) => {
  console.log("map.container.contextmenu", ev);
});
