import "../../main.css";
import "~/shared/main.css";
import "maplibre-gl/dist/maplibre-gl.css";

import * as maplibre from "maplibre-gl";

const $map = document.getElementById("map");

const map = new maplibre.Map({
  container: $map!,
  style: "https://demotiles.maplibre.org/style.json", // style URL
  center: [-3, 47],
  zoom: 4,
});

const size = 200;

const pulsingDot: {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
  context: null | CanvasRenderingContext2D;
  onAdd(): void;
  render(): boolean;
} = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),
  context: null,
  onAdd() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext("2d");
  },
  render() {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;

    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;

    if (!context) {
      return true;
    }

    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
    context.fill();

    // draw inner circle
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 100, 100, 1)";
    context.strokeStyle = "white";
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    this.data = context.getImageData(0, 0, this.width, this.height).data;
    map.triggerRepaint();

    return true;
  },
};

map.on("load", () => {
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
  map.addSource("points", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
          properties: {},
        },
      ],
    },
  });

  map.addLayer({
    id: "points",
    type: "symbol",
    source: "points",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });
});
