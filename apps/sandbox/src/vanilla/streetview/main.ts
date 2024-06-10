import { googleMapsApiToken } from "~/shared/constants";
import "./main.scss";
import { Loader } from "@googlemaps/js-api-loader";

const marignier = { lat: 46.0918, lng: 6.4988 };

const loader = new Loader({
  libraries: ["maps", "streetView"],
  version: "weekly",
  apiKey: googleMapsApiToken,
});

loader.load().then(init);

function init() {
  console.log(google.maps.Map, google.maps.StreetViewPanorama);
}

let map: google.maps.StreetViewPanorama;
let $map1: HTMLDivElement;

document.getElementById("action-1")?.addEventListener("click", () => {
  $map1 = document.createElement("div");
  $map1.classList.add("map");
  $map1.id = "map-1";

  map = new google.maps.StreetViewPanorama($map1, {
    position: marignier,
    pov: {
      heading: 0,
      pitch: 0,
    },
    enableCloseButton: false,
  });

  document.body.prepend($map1);

  console.log(map);
});

// detach
document.getElementById("action-2")?.addEventListener("click", () => {
  map.setVisible(false);
  $map1?.remove();
  console.log(map), $map1;
});

// attach
document.getElementById("action-3")?.addEventListener("click", () => {
  document.body.prepend($map1);
  map.setVisible(true);
  console.log(map, $map1);
});
