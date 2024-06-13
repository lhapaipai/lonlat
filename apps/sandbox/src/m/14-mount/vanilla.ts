import { Map } from "maplibre-gl";
import "./App.scss";
import "maplibre-theme/dist/classic.css";
import "maplibre-react-components/dist/mrc.css";

const marignier = { lng: 6.498, lat: 46.089 };

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root") as HTMLDivElement;

  let map = new Map({
    center: marignier,
    zoom: 3,
    container,
    style: "https://demotiles.maplibre.org/style.json",
  });

  map.on("error", (err) => {
    console.log("my error !!", err);
  });
  map.style.on("error", (event) => {
    // if (event.error.name !== "AbortError") {
    console.log(event);
    // }
  });
  map.remove();

  map = new Map({
    center: marignier,
    zoom: 3,
    container,
    style: "https://demotiles.maplibre.org/style.json",
  });
});

// window.addEventListener("DOMContentLoaded", () => {
//   const abortController = new AbortController();
//   fetch("/src/mr-own/14-mount/screenshot.png", {
//     signal: abortController.signal,
//   });

//   abortController.abort();
// });
