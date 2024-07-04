import {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";

export const isochroneFillLayerStyle: {
  paint?: FillLayerSpecification["paint"];
  layout?: FillLayerSpecification["layout"];
} = {
  paint: {
    "fill-color": "#000",
    "fill-opacity": 0.3,
  },
};

export const isochroneLineLayerStyle: {
  paint?: LineLayerSpecification["paint"];
  layout?: LineLayerSpecification["layout"];
} = {
  paint: {
    "line-color": "#333",
    "line-width": 3,
    "line-dasharray": [1, 1],
  },
};

export const roadLayerCasingStyle: {
  paint?: LineLayerSpecification["paint"];
  layout?: LineLayerSpecification["layout"];
} = {
  paint: {
    "line-color": "#136a7a",
    "line-width": ["step", ["zoom"], 6, 10, 8, 14, 10],
  },
};

export const roadLayerStyle: {
  paint?: LineLayerSpecification["paint"];
  layout?: LineLayerSpecification["layout"];
} = {
  paint: {
    "line-color": "#5fbcff",
    "line-width": ["step", ["zoom"], 4, 10, 6, 14, 8],
  },
};

export const roadLayerAccomplishedStyle: {
  paint?: LineLayerSpecification["paint"];
  layout?: LineLayerSpecification["layout"];
} = {
  paint: {
    "line-color": "#136a7a",
    "line-width": ["step", ["zoom"], 4, 10, 6, 14, 8],
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

export const roadHaloPaintStyle: {
  paint?: LineLayerSpecification["paint"];
  layout?: LineLayerSpecification["layout"];
} = {
  paint: {
    "line-width": 50,
    "line-color": "transparent",
  },
};
