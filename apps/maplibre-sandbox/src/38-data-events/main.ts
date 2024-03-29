import "pentatrion-design/styles/default.scss";
import "./style.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map, MapDataEvent, MapSourceDataEvent, MapStyleDataEvent } from "maplibre-gl";
import { styleBase, utm } from "./style";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: styleBase,
});

document.getElementById("infos")!.innerHTML = "hello";

let dashboard = "";
let content = "";

const skipTileSource = true;

function handleEvent(e: MapDataEvent | MapStyleDataEvent | MapSourceDataEvent) {
  switch (e.type) {
    case "sourcedata": {
      const event = e as MapSourceDataEvent;
      if (event.sourceDataType) {
        console.log(event.type, event.sourceDataType);
      } else if (event.coord) {
        if (!skipTileSource) {
          const coord = event.coord.canonical;
          console.log(event.type, `${coord.x}/${coord.y}/${coord.z}`);
        }
      } else {
        console.log(e.type, e);
      }
      break;
    }
    case "styledata": {
      console.log(e.type, e);

      const event = e as MapStyleDataEvent;
      const newContent = JSON.stringify(event.style.serialize(), undefined, 2);

      if (newContent != content) {
        content = newContent;
        dashboard = dashboard + "\n\n...nouveau style...\n\n" + content;
      } else {
        dashboard = dashboard + "\n\n...Inchangé...";
      }

      document.getElementById("infos")!.innerHTML = dashboard;
      break;
    }

    default:
      console.log(e.type, e);
  }
}

// map.on("terrain", handleEvent);
map.on("load", handleEvent);
// map.on("render", handleEvent);
map.on("styledata", handleEvent);
// map.on("styledataloading", handleEvent);
map.on("sourcedata", handleEvent);
// map.on("sourcedataloading", handleEvent);
// map.on("tiledataloading", handleEvent);
// map.on("data", handleEvent);

document.getElementById("action-1")?.addEventListener("click", () => {
  map.addSource("utm-trace-1", {
    type: "geojson",
    data: utm,
  });
});

document.getElementById("action-2")?.addEventListener("click", () => {
  map.addSource("utm-trace-2", {
    type: "geojson",
    data: "/data/utm-light.json",
  });
});

document.getElementById("action-3")?.addEventListener("click", () => {
  map.addLayer({
    source: "utm-trace-1",
    id: "utm-trace-line",
    type: "line",
  });
});

document.getElementById("action-4")?.addEventListener("click", () => {
  map.addSource("elevation", {
    type: "raster-dem",
    tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
    encoding: "terrarium",
    tileSize: 256,
  });
});
document.getElementById("action-5")?.addEventListener("click", () => {
  map.setTerrain({
    source: "elevation",
    exaggeration: 1,
  });
});
document.getElementById("action-6")?.addEventListener("click", () => {
  map.setStyle(styleBase, {
    diff: true,
    transformStyle(previous, next) {
      console.log("transformStyle");
      const savedSources = {};
      if (previous?.sources["utm-trace-1"]) {
        savedSources["utm-trace-1"] = previous.sources["utm-trace-1"];
      }
      const savedLayers = previous!.layers.filter((l) => l.id === "utm-trace-line");
      const newStyle = {
        ...next,
        sources: {
          ...next.sources,
          ...savedSources,
        },
        layers: next.layers.concat(savedLayers),
      };
      console.log(newStyle);
      return newStyle;
    },
  });
});
document.getElementById("action-7")?.addEventListener("click", () => {
  map.setStyle(styleBase, {
    diff: false,
    transformStyle(previous, next) {
      console.log("transformStyle");
      // debugger;
      return next;
    },
  });
});
