import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { AddLayerObject, ImageSource, LngLatLike, Map, MapMouseEvent } from "maplibre-gl";

const $map = document.getElementById("map")!;

const usa: LngLatLike = [-75.789, 41.874];

function getPath(imageId: number) {
  return `/examples/22-animate-images/data/radar${imageId}.gif`;
}

const map = new Map({
  container: $map,
  // style: "https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
  // center: usa,
  // zoom: 15,
  style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  zoom: 5,
  center: usa,
});

const frameCount = 5;
let currentImage = 0;

map.on("load", (e) => {
  map.addSource("radar", {
    type: "image",
    url: getPath(currentImage),
    coordinates: [
      [-80.425, 46.437],
      [-71.516, 46.437],
      [-71.516, 37.936],
      [-80.425, 37.936],
    ],
  });

  map.addLayer({
    id: "radar-layer",
    type: "raster",
    source: "radar",
    paint: {
      "raster-fade-duration": 0,
    },
  });

  setInterval(() => {
    currentImage = (currentImage + 1) % frameCount;
    (map.getSource("radar") as ImageSource | undefined)?.updateImage({
      url: getPath(currentImage),
    });
  }, 200);
});
