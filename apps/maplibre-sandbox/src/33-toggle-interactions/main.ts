import "@lonlat/shared/styles/_vite-sandbox.scss";
import "./style.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map } from "maplibre-gl";
import { ClickZoomHandler } from "./lib/ClickZoomHandler";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/styles/ign/PLAN.IGN/standard-geopf.json",

  doubleClickZoom: false,
});

type HandlerID =
  | "scrollZoom"
  | "boxZoom"
  | "dragRotate"
  | "dragPan"
  | "keyboard"
  | "doubleClickZoom"
  | "touchZoomRotate";

document.getElementById("listing-group")!.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  const handler = target.id as HandlerID;
  if (target.checked) {
    map[handler].enable();
  } else {
    map[handler].disable();
  }
});

const clickZoom = new ClickZoomHandler(map);
map.handlers._add("click", clickZoom);
clickZoom.enable();
