import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";

import * as maplibre from "maplibre-gl";
// import { LLPopup } from "maplibre-components";

const $map = document.getElementById("map");

const map = new maplibre.Map({
  container: $map!,
  style: "https://demotiles.maplibre.org/style.json", // style URL
  center: [-3, 47],
  zoom: 4,
});

// const popup = new LLPopup({
//   closeButton: false,
//   closeOnClick: false,
// });

// popup.setLngLat([-1.1344, 44.698]).setHTML("<div class='description'>hello world</div>").addTo(map);

const popup1 = new maplibre.Popup({
  closeButton: false,
  closeOnClick: false,
});

popup1.setLngLat([-6.293, 49.92]).setHTML("<div class='description'>hello world</div>").addTo(map);
