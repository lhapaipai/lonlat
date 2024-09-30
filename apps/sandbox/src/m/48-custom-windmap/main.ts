import "~/shared/tailwind.css";
import "~/shared/ml-overlay.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";

import { LngLatLike, Map } from "maplibre-gl";
import WindMap from "./WindMap";
import GUI from "lil-gui";
import { WindData } from "./types";

const dataImageLoader = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.onload = (e) => {
      resolve(e.target as HTMLImageElement);
    };
    img.src = url;
  });
};

const gui = new GUI();

const debug = false;
const windFile = debug ? "wind_debug" : "wind_2024-09-18T06.00.00Z";

const windSpeedRampColor = {
  0: "#3288bd",
  5: "#66c2a5",
  10: "#abdda4",
  20: "#e6f598",
  30: "#fee08b",
  40: "#fdae61",
  50: "#f46d43",
  60: "#d53e4f",
  80: "#9e0142",
  100: "#67001f",
  120: "#40000c",
};

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 6,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});
map.repaint = true;

map.on("load", () => {
  Promise.all([
    fetch(`data/${windFile}.json`).then((res) =>
      res.json(),
    ) as Promise<WindData>,
    dataImageLoader(`data/${windFile}.png`) as Promise<HTMLImageElement>,
  ]).then(([windData, windImage]) => {
    const windMap = new WindMap(windData, windImage, windSpeedRampColor);

    map.addLayer(windMap);
    gui.add(windMap, "numParticles", 1024, 589824);
    gui.add(windMap, "fadeOpacity", 0.01, 0.999).step(0.001);
    gui.add(windMap, "speedFactor", 0.05, 1.0);
    gui.add(windMap, "dropRate", 0, 0.1);
    gui.add(windMap, "dropRateBump", 0, 0.2);
  });

  // map.addSource("terrarium", {
  //   tiles: [
  //     "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
  //   ],
  //   encoding: "terrarium",
  //   tileSize: 256,
  //   type: "raster-dem",
  // });
  // map.setTerrain({
  //   source: "terrarium",
  //   exaggeration: 1.3,
  // });
});
