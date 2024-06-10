import "../../main.css";
import "~/shared/main.css";
import "maplibre-gl/dist/maplibre-gl.css";

import * as maplibre from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { area } from "@turf/turf";
const $map = document.getElementById("map");

const map = new maplibre.Map({
  container: $map!,
  style: "https://demotiles.maplibre.org/style.json", // style URL
  center: [-3, 47],
  zoom: 4,
});

const draw = new MapboxDraw({
  // displayControlsDefault: false,
  // controls: {
  //   polygon: true,
  //   trash: true,
  // },
});

function updateArea(e: any) {
  const data = draw.getAll();
  const answer = document.getElementById("calculated-area")!;
  if (data.features.length > 0) {
    const myArea = area(data);
    // restrict to area to 2 decimal points
    const roundedArea = Math.round(myArea * 100) / 100;
    answer.innerHTML = `<p><strong>${roundedArea}</strong></p><p>square meters</p>`;
  } else {
    answer.innerHTML = "";
    if (e.type !== "draw.delete")
      alert("Use the draw tools to draw a polygon!");
  }
}

map.on("load", () => {
  map.addControl(draw);
  map.on("draw.create", updateArea);
  map.on("draw.delete", updateArea);
  map.on("draw.update", updateArea);
});
