import "../../main.css";
import "~/shared/main.css";
import "maplibre-theme/dist/classic.css";
import "maplibre-react-components/dist/mrc.css";
import {
  FullscreenControl,
  GeolocateControl,
  LngLatLike,
  Map,
  NavigationControl,
  ScaleControl,
} from "maplibre-gl";
import CustomControl from "./CustomControl";
import LogoControl from "./LogoControl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

const customControl = new CustomControl();
customControl.on("mounted", (e) => {
  console.log("customControl mounted", e);
});

map.addControl(customControl);

map.addControl(new NavigationControl());
map.addControl(new FullscreenControl());
map.addControl(
  new GeolocateControl({
    showUserLocation: true,
  }),
);
map.addControl(new LogoControl());
map.addControl(
  new ScaleControl({
    unit: "metric",
  }),
);
