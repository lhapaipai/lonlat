import "../../main.css";
import "~/shared/main.css";
import "maplibre-gl/dist/maplibre-gl.css";

import * as maplibre from "maplibre-gl";
import { createDonutChart, colors } from "~/shared/util";

const $map = document.getElementById("map");

const map = new maplibre.Map({
  container: $map!,
  style: "https://demotiles.maplibre.org/style.json", // style URL
  center: [5, 45],
  zoom: 2,
});

// filters for classifying earthquakes into five categories based on magnitude
const mag1 = ["<", ["get", "mag"], 2];
const mag2 = ["all", [">=", ["get", "mag"], 2], ["<", ["get", "mag"], 3]];
const mag3 = ["all", [">=", ["get", "mag"], 3], ["<", ["get", "mag"], 4]];
const mag4 = ["all", [">=", ["get", "mag"], 4], ["<", ["get", "mag"], 5]];
const mag5 = [">=", ["get", "mag"], 5];

interface MarkerDict {
  [key: string]: maplibre.Marker;
}

map.on("load", () => {
  map.addSource("earthquakes", {
    type: "geojson",
    data: "https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson",
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 80,
    clusterProperties: {
      mag1: ["+", ["case", mag1, 1, 0]],
      mag2: ["+", ["case", mag2, 1, 0]],
      mag3: ["+", ["case", mag3, 1, 0]],
      mag4: ["+", ["case", mag4, 1, 0]],
      mag5: ["+", ["case", mag5, 1, 0]],
    },
  });

  map.addLayer({
    id: "earthquake_circle",
    type: "circle",
    source: "earthquakes",
    filter: ["!=", "cluster", true],
    paint: {
      "circle-color": [
        "case",
        mag1,
        colors[0],
        mag2,
        colors[1],
        mag3,
        colors[2],
        mag4,
        colors[3],
        colors[4],
      ],
      "circle-opacity": 0.6,
      "circle-radius": 12,
    },
  });

  map.addLayer({
    id: "earthquake_label",
    type: "symbol",
    source: "earthquakes",
    filter: ["!=", "cluster", true],
    layout: {
      "text-field": [
        "number-format",
        ["get", "mag"],
        { "min-fraction-digits": 1, "max-fraction-digits": 1 },
      ],
      "text-size": 10,
    },
  });

  // eslint-disable-next-line prefer-const
  let markers: MarkerDict = {};
  let markersOnScreen: MarkerDict = {};

  function updateMarkers() {
    const newMarkers: MarkerDict = {};
    const features = map.querySourceFeatures("earthquakes");

    for (let i = 0; i < features.length; i++) {
      const coords = features[i].geometry.coordinates;
      const props = features[i].properties;
      if (!props.cluster) continue;
      const id = props.cluster_id;
      console.log("cluster_id", id);

      let marker = markers[id];
      if (!marker) {
        const el = createDonutChart(props);
        marker = new maplibre.Marker({
          element: el,
        }).setLngLat(coords);
        markers[id] = marker;
      }
      newMarkers[id] = marker;

      if (!markersOnScreen[id]) {
        marker.addTo(map);
      }
    }

    for (const id in markersOnScreen) {
      if (!newMarkers[id]) markersOnScreen[id].remove();
    }

    markersOnScreen = newMarkers;
  }

  map.on("data", (e) => {
    if (e.sourceId !== "earthquakes" || !e.isSourceLoaded) return;

    map.on("move", updateMarkers);
    map.on("moveend", updateMarkers);
    updateMarkers();
  });
});
