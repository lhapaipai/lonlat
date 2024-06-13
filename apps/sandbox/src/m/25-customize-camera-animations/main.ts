/**
 * L'animation sera ignorée et se comportera de manière équivalente à jumpTo si l'utilisateur a activé
 * la fonction d'accessibilité aux mouvements réduits dans son système d'exploitation, à moins que
 * «options» n'inclue essential:true.
 */

import "../../main.css";
import "~/shared/main.css";
import "maplibre-theme/dist/default.css";
import "maplibre-react-components/dist/mrc.css";
import { FlyToOptions, GeoJSONSource, LngLatLike, Map } from "maplibre-gl";
import { EasingKeys, easingFunctions } from "./easing";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089]!;

const map = new Map({
  container: $map,
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

const $durationValue = document.getElementById(
  "durationValue",
) as HTMLSpanElement;
const $durationInput = document.getElementById("duration") as HTMLInputElement;
$durationValue.innerHTML = `${$durationInput.valueAsNumber / 1000} seconds`;
$durationInput.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  $durationValue.innerHTML = `${target.valueAsNumber / 1000} seconds`;
});

const $animateLabel = document.getElementById(
  "animateLabel",
) as HTMLLabelElement;
const $animateValue = document.getElementById("animate") as HTMLInputElement;
$animateValue.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  $animateLabel.innerHTML = target.checked ? "Yes" : "No";
});

const $animateButton = document.getElementById(
  "animateButton",
) as HTMLButtonElement;
const $easingInput = document.getElementById("easing") as HTMLSelectElement;

const $offsetX = document.getElementById("offset-x") as HTMLInputElement;
const $offsetY = document.getElementById("offset-y") as HTMLInputElement;

map.on("load", () => {
  map.addSource("center", {
    type: "geojson",
    data: {
      type: "Point",
      coordinates: marignier,
    },
  });

  map.addLayer({
    id: "center",
    type: "symbol",
    source: "center",
    layout: {
      "icon-image": "Balise",
      "icon-anchor": "bottom",
      "icon-offset": [0, -10],
      "text-field": "Center: [6.498, 46.089]",
      "text-font": ["Source Sans Pro Regular"],
      "text-offset": [0, 0.5],
      "text-anchor": "top",
    },
  });
  map.addLayer({
    id: "center-point",
    type: "circle",
    source: "center",
    paint: {
      "circle-color": "red",
      "circle-radius": 3,
    },
  });

  $animateButton.addEventListener("click", () => {
    const easingFn = easingFunctions[$easingInput.value as EasingKeys];
    const duration = $durationInput.valueAsNumber;
    const animate = $animateValue.checked;

    const offsetX = $offsetX.valueAsNumber;
    const offsetY = $offsetY.valueAsNumber;

    const center: LngLatLike = [
      marignier[0] + (Math.random() - 0.5) * 0.1,
      marignier[1] + (Math.random() - 0.5) * 0.1,
    ];

    const animationOptions: FlyToOptions = {
      duration,
      easing: easingFn,
      offset: [offsetX, offsetY],
      animate,
      center,
      essential: true,
    };

    map.flyTo(animationOptions);
    (map.getSource("center") as GeoJSONSource | undefined)?.setData({
      type: "Point",
      coordinates: center,
    });

    map.setLayoutProperty(
      "center",
      "text-field",
      `Center: [${center[0].toFixed(1)}, ${center[1].toFixed(1)}]`,
    );
  });
});
