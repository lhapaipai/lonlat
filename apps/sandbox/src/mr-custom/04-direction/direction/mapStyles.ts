import {
  CircleLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";

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

export const roadArrowLayerStyle: {
  paint?: SymbolLayerSpecification["paint"];
  layout?: SymbolLayerSpecification["layout"];
} = {
  layout: {
    "icon-size": 0.5,
    "icon-image": "oneway",
    "symbol-placement": "line",
    "symbol-spacing": 75,
    "icon-rotation-alignment": "map",
    "icon-rotate": 90,
    "icon-padding": 2,
  },
};
