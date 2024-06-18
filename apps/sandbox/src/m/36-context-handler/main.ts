import "../../main.css";
import "./style.scss";
import "maplibre-theme/classic.css";
import "maplibre-react-components/dist/style.css";
import { LngLatLike, Map } from "maplibre-gl";
import ContextHandler from "./lib/ContextHandler";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

type HandlerID =
  | "scrollZoom"
  | "boxZoom"
  | "dragRotate"
  | "dragPan"
  | "keyboard"
  | "doubleClickZoom"
  | "touchZoomRotate";

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

document.getElementById("listing-group")!.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  const handler = target.id as HandlerID;
  if (target.checked) {
    map[handler].enable();
  } else {
    map[handler].disable();
  }
});

const contextHandler = new ContextHandler(map);
map.handlers._add("contextmenu", contextHandler);
contextHandler.enable();
