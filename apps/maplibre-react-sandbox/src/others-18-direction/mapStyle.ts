import { LineLayer } from "react-map-gl/maplibre";

export const routeLayer: LineLayer = {
  id: "direction-route",
  type: "line",
  paint: {
    "line-color": "#333",
    "line-width": 3,
  },
};
