import "~/shared/tailwind.css";
import "~/shared/ml-overlay.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { LngLatLike, Map, Point, Popup } from "maplibre-gl";
import "./style.scss";

const $map = document.getElementById("map")!;

const usa: LngLatLike = [-98, 38.88];

const map = new Map({
  container: $map,
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  center: usa,
  zoom: 3,

  boxZoom: false,
});

const popup = new Popup({
  closeButton: false,
});

map.on("load", () => {
  // Add a custom vector tileset source. The tileset used in
  // this example contains a feature for every county in the U.S.
  // Each county contains four properties. For example:
  // {
  //     COUNTY: "Uintah County",
  //     FIPS: 49047,
  //     median-income: 62363,
  //     population: 34576
  // }
  map.addSource("usa-provinces", {
    type: "geojson",
    data: "/data/usa-provinces.geojson",
  });

  map.addLayer({
    id: "provinces",
    type: "fill",
    source: "usa-provinces",
    paint: {
      "fill-outline-color": "rgba(0,0,0,0.1)",
      "fill-color": "rgba(0,0,0,0.1)",
    },
  });

  map.addLayer({
    id: "provinces-highlighted",
    type: "fill",
    source: "usa-provinces",
    paint: {
      "fill-outline-color": "#484896",
      "fill-color": "#6e599f",
      "fill-opacity": 0.75,
    },
    filter: ["in", "adm1_code", ""],
  });

  // Variable to hold the starting xy coordinates
  // when `mousedown` occured.
  let start: Point;

  // Variable to hold the current xy coordinates
  // when `mousemove` or `mouseup` occurs.
  let current: Point;

  // Variable for the draw box element.
  let box: HTMLDivElement | null = null;

  const canvas = map.getCanvasContainer();
  canvas.addEventListener("mousedown", onMouseDown, true);

  function mousePos(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return new Point(
      e.clientX - rect.left - canvas.clientLeft,
      e.clientY - rect.top - canvas.clientTop,
    );
  }

  function onMouseDown(e: MouseEvent) {
    if (!(e.shiftKey && e.button === 0)) return;

    map.dragPan.disable();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keydown", onKeyDown);

    start = mousePos(e);
  }

  function onMouseMove(e: MouseEvent) {
    current = mousePos(e);

    if (!box) {
      box = document.createElement("div");
      box.classList.add("boxdraw");
      canvas.appendChild(box);
    }

    const minX = Math.min(start.x, current.x),
      maxX = Math.max(start.x, current.x),
      minY = Math.min(start.y, current.y),
      maxY = Math.max(start.y, current.y);

    const pos = `translate(${minX}px, ${minY}px)`;
    box.style.transform = pos;
    box.style.width = maxX - minX + "px";
    box.style.height = maxY - minY + "px";
  }

  function onMouseUp(e: MouseEvent) {
    finish([start, mousePos(e)]);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.keyCode === 27) finish();
  }

  function finish(bbox?: [Point, Point]) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("mouseup", onMouseUp);

    if (box) {
      box.parentNode?.removeChild(box);
      box = null;
    }

    if (bbox) {
      const features = map.queryRenderedFeatures(bbox, {
        layers: ["provinces"],
      });

      const provinceIDs = features.map(
        (feature) => feature.properties.adm1_code,
      );
      map.setFilter("provinces-highlighted", [
        "in",
        "adm1_code",
        ...provinceIDs,
      ]);
    }

    map.dragPan.enable();
  }

  map.on("mousemove", (e): void => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["provinces-highlighted"],
    });

    map.getCanvas().style.cursor = features.length ? "pointer" : "";

    if (!features.length) {
      popup.remove();
      return;
    }

    popup.setLngLat(e.lngLat).setText(features[0].properties.name).addTo(map);
  });
});
