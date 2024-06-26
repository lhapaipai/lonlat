import "~/shared/tailwind.css";
import "~/shared/ml-overlay.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import "./styles.scss";
import {
  LngLatLike,
  Map,
  Marker,
  PaddingOptions,
  RequireAtLeastOne,
} from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map: Map | null = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

new Marker().setLngLat(marignier).addTo(map);

function toggleSidebar(id: "left" | "right") {
  const $elt = document.getElementById(id) as HTMLDivElement;
  const wellBeCollapsed = !$elt.classList.contains("collapsed");

  $elt.classList.toggle("collapsed", wellBeCollapsed);

  const padding = {
    [id]: wellBeCollapsed ? 0 : 300,
  } as RequireAtLeastOne<PaddingOptions>;

  map?.easeTo({
    padding,
    duration: 1000,
  });
}

(document.getElementById("left") as HTMLDivElement)
  ?.querySelector(".sidebar-toggle")
  ?.addEventListener("click", () => {
    toggleSidebar("left");
  });

(document.getElementById("right") as HTMLDivElement)
  ?.querySelector(".sidebar-toggle")
  ?.addEventListener("click", () => {
    toggleSidebar("right");
  });
