import { scaleQuantile } from "d3-scale";
import { range } from "d3-array";
import { LayerProps } from "react-map-gl/maplibre";
import { ProcessedFeatures, RawFeature, RawFeatures } from "./types";

export function addPercentiles(
  featureCollection: RawFeatures,
  accessor: (f: RawFeature) => number,
): ProcessedFeatures {
  const { features } = featureCollection;
  console.log("domain", features.map(accessor));
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: "FeatureCollection",
    features: features.map((f) => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value),
      };
      return {
        ...f,
        properties,
      };
    }),
  };
}

export const dataLayerProps: LayerProps = {
  type: "fill",
  paint: {
    "fill-color": {
      type: "interval",
      property: "percentile",
      stops: [
        [0, "#3288bd"],
        [1, "#66c2a5"],
        [2, "#abdda4"],
        [3, "#e6f598"],
        [4, "#ffffbf"],
        [5, "#fee08b"],
        [6, "#fdae61"],
        [7, "#f46d43"],
        [8, "#d53e4f"],
      ],
    },
    "fill-opacity": 0.8,
  },
};
