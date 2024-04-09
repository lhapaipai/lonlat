import { CircleLayerSpecification, LineLayerSpecification } from "maplibre-gl";

export const roadLayerCasingStyle: {
  paint?: LineLayerSpecification["paint"];
  layout?: LineLayerSpecification["layout"];
} = {
  paint: {
    "line-color": "#111",
    "line-width": 7,
  },
};

export const roadLayerStyle: {
  paint?: LineLayerSpecification["paint"];
  layout?: LineLayerSpecification["layout"];
} = {
  paint: {
    "line-color": "#ffe64b",
    "line-width": 5,
  },
};

export const waypointsLayerStyle: {
  paint?: CircleLayerSpecification["paint"];
  layout?: CircleLayerSpecification["layout"];
} = {
  paint: {
    "circle-pitch-alignment": "map",
    "circle-color": "#111",
    "circle-radius": 5,
  },
};
