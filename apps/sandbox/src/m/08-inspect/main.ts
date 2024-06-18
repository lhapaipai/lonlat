import "~/shared/tailwind.css";
import "~/shared/ml-overlay.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/dist/style.css";

// mapbox-gl-controls is depracated
// import { InspectControl } from "mapbox-gl-controls";
// import "mapbox-gl-controls/lib/controls.css";

import * as maplibre from "maplibre-gl";

const $map = document.getElementById("map");

const marignier: maplibre.LngLatLike = [6.498, 46.089];

const map = new maplibre.Map({
  container: $map!,
  // style: "https://demotiles.maplibre.org/style.json", // style URL
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
  center: marignier,
  zoom: 15,
});
console.log(map);
// map.addControl(new InspectControl(), "bottom-right");
