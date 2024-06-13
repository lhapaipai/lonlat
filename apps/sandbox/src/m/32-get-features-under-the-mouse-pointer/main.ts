import "../../main.css";
import "./style.scss";
import "maplibre-theme/dist/classic.css";
import "maplibre-react-components/dist/mrc.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
  // style: "/assets/styles/ign/ADMIN_EXPRESS/adminexpress.json",
});

map.on("mousemove", (e) => {
  const features = map.queryRenderedFeatures(e.point);

  const displayProperties = [
    "type",
    "properties",
    "id",
    "layer",
    "source",
    "sourceLayer",
    "state",
  ];

  let displayFeatures = [];

  const compact = false;

  if (compact) {
    displayFeatures = features.map((f) => {
      return f.layer.id;
    });
  } else {
    displayFeatures = features.map((f) => {
      return Object.fromEntries(
        // @ts-ignore
        displayProperties.map((prop) => [prop, f[prop]]),
      );
    });
  }

  document.getElementById("features")!.innerHTML = JSON.stringify(
    displayFeatures,
    null,
    2,
  );
});
