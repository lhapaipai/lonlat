import "@lonlat/shared/styles/_vite-sandbox.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";

// mapbox-gl-controls is depracated
// import { InspectControl } from "mapbox-gl-controls";
// import "mapbox-gl-controls/lib/controls.css";

import * as maplibre from "maplibre-gl";

const $map = document.getElementById("map");

const marignier: maplibre.LngLatLike = [6.498, 46.089];

const map = new maplibre.Map({
  container: $map!,
  // style: "https://demotiles.maplibre.org/style.json", // style URL
  style: "/styles/ign/PLAN.IGN/standard.json",
  center: marignier,
  zoom: 15,
});
console.log(map);
// map.addControl(new InspectControl(), "bottom-right");
