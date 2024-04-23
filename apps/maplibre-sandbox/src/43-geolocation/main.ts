import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map } from "maplibre-gl";
import { GeolocateControl } from "./GeolocateControl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  // style: "https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
  // center: marignier,
  // zoom: 15,
  // style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  // zoom: 0.3,
  // center: [0, 20],
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

const ctrl = new GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  fitBoundsOptions: {
    maxZoom: 15,
  },
  trackUserLocation: true,
  showAccuracyCircle: true,
  showUserLocation: true,
});

ctrl.on("trackuserlocationend", (e) => {
  console.log("trackuserlocationend", e);
});

ctrl.on("trackuserlocationstart", (e) => {
  console.log("trackuserlocationstart", e);
});

ctrl.on("geolocate", (e) => {
  console.log("geolocate", e);
});

ctrl.on("error", (e) => {
  console.log("error", e);
});

ctrl.on("outofmaxbounds", (e) => {
  console.log("outofmaxbounds", e);
});

map.addControl(ctrl);
