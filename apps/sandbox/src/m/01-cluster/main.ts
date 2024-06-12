import "../../main.css";
import "~/shared/main.css";
import "maplibre-theme/dist/core.css";
import "maplibre-theme/dist/default.css";
import "maplibre-react-components/dist/mrc.css";

import * as maplibre from "maplibre-gl";

const $map = document.getElementById("map");

const map = new maplibre.Map({
  container: $map!,
  style: "https://demotiles.maplibre.org/style.json", // style URL
  center: [5, 45],
  zoom: 2,
});

map.on("load", () => {
  map.addSource("earthquakes", {
    type: "geojson",
    data: "https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson",
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "earthquakes",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "earthquakes",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
    },
  });
  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "earthquakes",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
});
