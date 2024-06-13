import "../../main.css";
import "~/shared/main.css";
import "maplibre-theme/dist/default.css";
import "maplibre-react-components/dist/mrc.css";
import { LngLatLike, Map, StyleSpecification } from "maplibre-gl";
import standard from "./standard.json";
import minimal from "./minimal.json";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: minimal as StyleSpecification,
});

const $zoom = document.getElementById("zoom")!;
function handleZoom() {
  $zoom.innerText = map.getZoom().toString();
}
map.on("zoom", handleZoom);
handleZoom();

document.getElementById("action-1")?.addEventListener("click", () => {
  map.setStyle(standard as StyleSpecification);
});

document.getElementById("action-2")?.addEventListener("click", () => {
  map.setStyle(minimal as StyleSpecification);
});

map.on("load", async () => {
  const image = await map.loadImage("/lonlat.png");
  map.addImage("logo", image.data);

  map.addSource("trace", {
    type: "geojson",
    promoteId: "id",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            id: "mari-01",
            name: "Marignier",
            department: "Haute-Savoie",
            important: true,
            radius: "non",
            category: "mairie",
          },
          geometry: {
            type: "Point",
            coordinates: [6.498, 46.089],
          },
        },
        {
          type: "Feature",
          properties: {
            id: "mari-02",
            category: "other",
          },
          geometry: {
            type: "Point",
            coordinates: [6.505, 46.089],
          },
        },
      ],
    },
  });

  map.addSource("trace-02", {
    type: "geojson",
    // promoteId: "value",
    generateId: true,
    data: {
      type: "FeatureCollection",
      features: [
        {
          id: 40,
          type: "Feature",
          properties: {
            value: 30,
            value2: null,
            values: ["Hello", "world"],
            visible: false,
          },
          geometry: {
            type: "Point",
            coordinates: [6.492, 46.089],
          },
        },
      ],
    },
  });

  map.addLayer({
    id: "price",
    type: "symbol",
    source: "trace-02",
    /* prettier-disable */
    layout: {
      "text-field": ["id"],
      "text-font": ["Source Sans Pro Regular"],
    },
    paint: {
      "text-translate": [0, 30],
    },
    /* prettier-enable */
  });

  map.addLayer({
    id: "price-circle",
    type: "circle",
    source: "trace-02",
    /* prettier-disable */
    paint: {
      "circle-radius": {
        property: "value",
        stops: [
          [13, 10],
          [14, 100],
        ],
        type: "categorical",
      },
    },
    /* prettier-enable */
  });

  map.addLayer({
    id: "price-circle-copy",
    type: "circle",
    source: "trace-02",
    /* prettier-disable */
    paint: {
      "circle-radius": {
        property: "value",
        stops: [
          [30, 50],
          [31, 100],
        ],
        type: "categorical",
      },
      "circle-translate": [0, -200],
    },
    /* prettier-enable */
  });

  map.on("mouseenter", "price-circle", (e) => {
    console.log(e.features?.[0]);
  });

  map.addLayer({
    id: "logo",
    type: "symbol",
    filter: ["==", ["get", "category"], "other"],
    source: "trace",
    layout: {
      "icon-image": "logo",
    },
  });

  map.addLayer({
    id: "city-circle",
    type: "circle",
    source: "trace",
    filter: ["==", ["get", "category"], "mairie"],
    paint: {
      /* prettier-disable */
      "circle-color": [
        "let",
        "myRadius",
        10,
        [
          "interpolate",
          ["linear"],
          ["var", "myRadius"],
          8,
          "black",
          15,
          "white",
        ],
      ],
      /* prettier-enable */
    },
  });

  map.addLayer({
    id: "city-label",
    source: "trace",
    type: "symbol",
    layout: {
      "text-field": [
        /* prettier-disable */
        "format",
        ["upcase", ["get", "name"]],
        { "font-scale": 1.2, "text-color": "green" },

        "\n",
        {},

        ["downcase", ["get", "department"]],
        { "font-scale": 0.5 },

        /* prettier-enable */
      ],
      "text-font": ["Source Sans Pro Regular"],
    },
    paint: {
      "text-opacity": 1,
      "text-translate": [0, -20],
    },
  });
});
