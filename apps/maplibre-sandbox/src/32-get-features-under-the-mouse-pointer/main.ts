import "pentatrion-design/styles/_vite-sandbox.scss";
import "./style.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/styles/ign/PLAN.IGN/standard-geopf.json",
});

map.on("mousemove", (e) => {
  const features = map.queryRenderedFeatures(e.point);

  const displayProperties = ["type", "properties", "id", "layer", "source", "sourceLayer", "state"];

  let displayFeatures = [];

  const compact = true;

  if (compact) {
    displayFeatures = features.map((f) => {
      return f.layer.id;
    });
  } else {
    displayFeatures = features.map((f) => {
      return Object.fromEntries(displayProperties.map((prop) => [prop, f[prop]]));
    });
  }

  document.getElementById("features")!.innerHTML = JSON.stringify(displayFeatures, null, 2);
});
