import "../../main.css";
import "~/shared/main.css";
import "maplibre-theme/dist/classic.css";
import "maplibre-react-components/dist/mrc.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  // style: "/assets/styles/ign/PLAN.IGN/standard.json",
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  // maxBounds: new LngLatBounds(new LngLat(6.3, 45.8), new LngLat(6.7, 46.2)),
  renderWorldCopies: false,
});

map.on("click", (e) => console.log("click", e.lngLat));
console.log(map);
