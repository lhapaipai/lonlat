import { StyleSpecification } from "maplibre-gl";
import {
  BaseLayerId,
  LayerInfos,
  OptionalLayerId,
  OptionalLayerInfo,
  baseLayersById,
  optionalLayersById,
} from "./layers";

export async function prepareStyle(
  baseLayerId: BaseLayerId,
  optionalLayersId: OptionalLayerId[],
  terrain: boolean,
): Promise<StyleSpecification | string> {
  const baseLayer: LayerInfos = baseLayersById[baseLayerId];

  let style: StyleSpecification;

  if (typeof baseLayer.style === "string") {
    const res = await fetch(baseLayer.style);
    style = await res.json();
  } else {
    style = { ...baseLayer.style };
  }

  const nextLayers = style.layers.slice();

  let extraSources: StyleSpecification["sources"] = {};

  const allOptionalLayersId: OptionalLayerId[] = Array.from(
    new Set([
      ...(terrain ? (["terrain", "hillshade"] as const) : []),
      ...optionalLayersId,
    ]),
  );

  for (const optionalLayerId of allOptionalLayersId) {
    let optionalLayerInfo: OptionalLayerInfo = {
      id: optionalLayerId,
      beforeId: undefined,
    };

    if (!["street-view", "terrain"].includes(optionalLayerId)) {
      // optionalLayersId contains filters from redux. It can be possible than some
      // filters are not compatible with baseLayer but are enabled by prevBaseLayer.
      const infos = baseLayer.optionalLayers.find(
        (o) => o.id === optionalLayerId,
      );
      if (!infos) {
        continue;
      }
      optionalLayerInfo = infos;
    }

    const optionalLayer = optionalLayersById[optionalLayerId];
    if (!optionalLayer) {
      continue;
    }

    let optionalStyle: StyleSpecification;
    if (typeof optionalLayer.style === "string") {
      const res = await fetch(optionalLayer.style);
      optionalStyle = await res.json();
    } else {
      optionalStyle = optionalLayer.style;
    }

    extraSources = {
      ...extraSources,
      ...optionalStyle.sources,
    };

    // optionalStyle are compatible with baseLayer
    // that means the base layer either has the same glyphs and sprite as the optional
    // layer or has none at all
    if (optionalStyle.glyphs) {
      style.glyphs = optionalStyle.glyphs;
    }
    if (optionalStyle.sprite) {
      style.sprite = optionalStyle.sprite;
    }

    let insertLayerIndex = nextLayers.length;

    if (optionalLayerInfo.beforeId) {
      insertLayerIndex = nextLayers.findIndex(
        (l) => l.id === optionalLayerInfo.beforeId,
      );

      if (insertLayerIndex === -1) {
        insertLayerIndex = nextLayers.length;
      }
    }

    nextLayers.splice(insertLayerIndex, 0, ...optionalStyle.layers);
  }

  const nextStyle: StyleSpecification = {
    ...style,
    layers: nextLayers,
    sources: {
      ...style.sources,
      ...extraSources,
    },
    terrain: terrain
      ? {
          source: "terrarium",
          exaggeration: 1.2,
        }
      : undefined,
  };

  // console.log(Object.keys(Object.assign({}, style.sources, extraSources)));
  // console.log(nextStyle.sources, nextStyle.layers);
  return nextStyle;
}

export const marignier = {
  lng: 6.498,
  lat: 46.089,
  zoom: 12,
};
export const france =
  document.documentElement.clientWidth > 768
    ? {
        lng: 2.5,
        lat: 46.5,
        zoom: 5,
      }
    : {
        lng: 2.5,
        lat: 47.5,
        zoom: 4.5,
      };
