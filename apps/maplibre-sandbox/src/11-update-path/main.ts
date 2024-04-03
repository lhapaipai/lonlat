import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import * as maplibre from "maplibre-gl";
import { LLMarker, LLPopup } from "pentatrion-geo";
const $map = document.getElementById("map");

const marignier: maplibre.LngLatLike = [6.47249, 46.1023399];
const startPoint: maplibre.LngLat = [6.500239938608518, 46.09073992765464];
const mole: maplibre.LngLat = [6.4576, 46.1057];
const map = new maplibre.Map({
  container: $map!,
  // style: "/styles/ign/PLAN.IGN/standard.json",
  style: "/styles/ign/custom/top-25-dem.json",
  center: marignier,
  zoom: 13,
  pitch: 43,
});

map.on("moveend", () => {
  console.log(map.getCenter(), map.getZoom(), map.getPitch());
});

async function initTrace() {
  const [trace, checkpoints] = await Promise.all([
    fetch("/data/utm-smooth.geojson").then((res) => res.json()),
    fetch("/data/utm-checkpoints.geojson").then((res) => res.json()),
  ]);

  const checkpointsByDistance = {};

  checkpoints.features.forEach((feature) => {
    checkpointsByDistance[feature.properties.distance] = feature;
  });

  new LLMarker({
    icon: "fe-home",
  })
    .setLngLat(startPoint)
    .addTo(map);

  const molePopup = new LLPopup().setHTML("altitude : 1863m", "le Môle");

  new LLMarker({
    icon: "fe-summit",
  })
    .setLngLat(mole)
    .setPopup(molePopup)
    .addTo(map);

  map.addSource("utm", {
    type: "geojson",
    data: trace,
  });

  map.addLayer({
    id: "utm-line",
    type: "line",
    source: "utm",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "yellow",
      "line-width": 4,
      "line-opacity": 0.3,
    },
  });

  const fullCoordinates = trace.geometry.coordinates;

  const head = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [fullCoordinates[0]],
    },
  };
  const completed = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [fullCoordinates[0]],
    },
  };
  trace.geometry.coordinates = [fullCoordinates[0]];

  map.addSource("traceCompleted", {
    type: "geojson",
    data: completed,
  });
  map.addSource("traceHead", {
    type: "geojson",
    data: head,
  });
  const traceCompletedSource = map.getSource("traceCompleted") as maplibre.GeoJSONSource;
  const traceHeadSource = map.getSource("traceHead") as maplibre.GeoJSONSource;

  map.addLayer({
    id: "utm-completed-line",
    type: "line",
    source: "traceCompleted",
    paint: {
      "line-color": "#000",
      "line-opacity": 0.75,
      "line-width": 4,
    },
  });
  map.addLayer({
    id: "utm-head-line",
    type: "line",
    source: "traceHead",
    paint: {
      "line-color": "yellow",
      "line-opacity": 1,
      "line-width": 4,
    },
  });

  let i = 1;
  let nextCheckpoint = 3;
  let checkpointMarkers: LLMarker[] = [];
  setInterval(() => {
    if (i < fullCoordinates.length) {
      head.geometry.coordinates.push(fullCoordinates[i]);
      if (head.geometry.coordinates.length > 5) {
        head.geometry.coordinates.shift();
        completed.geometry.coordinates.push(fullCoordinates[i - 5]);
      }
      if (fullCoordinates[i][2] > nextCheckpoint) {
        const feature = checkpointsByDistance[nextCheckpoint];
        nextCheckpoint += 3;
        const newMarker = new LLMarker({
          scale: 0.75,
          color: "#9ed24d",
          text: feature.properties.distance,
          className: "small-text",
        })
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);
        const prevMarker = checkpointMarkers[checkpointMarkers.length - 1];
        if (prevMarker) {
          prevMarker.setColor("#c0c0c0").setScale(0.5);
        }
        checkpointMarkers.push(newMarker);
      }
      traceCompletedSource.setData(completed);
      traceHeadSource.setData(head);
      i++;
    } else {
      head.geometry.coordinates = [fullCoordinates[0]];
      completed.geometry.coordinates = [fullCoordinates[0]];
      i = 1;
      nextCheckpoint = 3;
      checkpointMarkers.forEach((marker) => marker.remove());
      checkpointMarkers = [];
    }
  }, 30);
}

map.on("load", async () => {
  initTrace();
});
