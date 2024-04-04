import { FillLayerSpecification } from "maplibre-gl";

export const countiesLayer: FillLayerSpecification = {
  id: "counties",
  source: "",
  "source-layer": "commune",
  type: "fill",
  paint: {
    "fill-outline-color": "rgba(0,0,0,0.1)",
    "fill-color": "rgba(0,0,0,0.1)",
  },
};

export const highlightLayer: FillLayerSpecification = {
  id: "counties-highlighted",
  source: "counties",
  "source-layer": "commune",
  type: "fill",
  paint: {
    "fill-outline-color": "#484896",
    "fill-color": "#6e599f",
    "fill-opacity": 0.75,
  },
};
