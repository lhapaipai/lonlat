import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";

import * as maplibre from "maplibre-gl";

const $map = document.getElementById("map");
const marignier: maplibre.LngLatLike = [6.498, 46.089];

const map = new maplibre.Map({
  container: $map!,
  style: "/styles/ign/PLAN.IGN/standard.json",
  center: marignier,
  zoom: 17,
});

const swatches = document.getElementById("swatches")!;
const layer = document.getElementById("layer") as HTMLSelectElement;
const colors = [
  "#ffffcc",
  "#a1dab4",
  "#41b6c4",
  "#2c7fb8",
  "#253494",
  "#fed976",
  "#feb24c",
  "#fd8d3c",
  "#f03b20",
  "#bd0026",
];

colors.forEach((color) => {
  const swatch = document.createElement("button");
  swatch.classList.add("color");
  swatch.style.backgroundColor = color;
  swatch.addEventListener("click", () => {
    map.setPaintProperty(layer.value, "fill-color", color);
  });
  swatches.appendChild(swatch);
});
