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
  layout?: LineLayerSpecification["layout"];
  paint?: LineLayerSpecification["paint"];
  paintTemp?: LineLayerSpecification["paint"];
} = {
  layout: {
    "line-join": "round",
    "line-round-limit": 1,
  },
  paint: {
    "line-color": "#136a7a",
    "line-width": ["step", ["zoom"], 6, 10, 8, 14, 10],
  },
  paintTemp: {
    "line-color": "#136a7a",
    "line-opacity": 0.6,
    "line-width": ["step", ["zoom"], 6, 10, 8, 14, 10],
  },
};

export const roadLayerStyle: {
  layout?: LineLayerSpecification["layout"];
  paint?: LineLayerSpecification["paint"];
  paintTemp?: LineLayerSpecification["paint"];
} = {
  layout: {
    "line-join": "round",
    "line-round-limit": 1,
  },
  paint: {
    "line-color": "#5fbcff",
    "line-width": ["step", ["zoom"], 4, 10, 6, 14, 8],
  },
  paintTemp: {
    "line-color": "#ffffff",
    "line-opacity": 0.6,
    "line-width": ["step", ["zoom"], 4, 10, 6, 14, 8],
  },
};

export const roadLayerAccomplishedStyle: {
  paint?: LineLayerSpecification["paint"];
  layout?: LineLayerSpecification["layout"];
} = {
  layout: {
    "line-join": "round",
    "line-round-limit": 1,
  },
  paint: {
    "line-color": "#3993bc",
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
