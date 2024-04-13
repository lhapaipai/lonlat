import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map } from "maplibre-gl";

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

document.getElementById("action-1")?.addEventListener("click", () => {
  map.setStyle("/assets/styles/ign/PLAN.IGN/standard.json", {
    transformStyle(prevStyle, nextStyle) {
      console.log("transformStyle");
      return nextStyle;
    },
  });
});

document.getElementById("action-2")?.addEventListener("click", () => {
  map.setStyle(
    {
      version: 8,
      metadata: {
        lonlat: {
          placeholders: {
            cadastre: 20,
            labels: 15,
          },
        },
      },
      sources: {
        orthophoto: {
          type: "raster",
          tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "orthophoto",
          type: "raster",
          source: "orthophoto",
          minzoom: 0,
          maxzoom: 20,
        },
      ],
    },
    {
      transformStyle(prevStyle, nextStyle) {
        console.log("transformStyle2", nextStyle);
        return nextStyle;
      },
    },
  );
});
