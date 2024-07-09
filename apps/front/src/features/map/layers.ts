import {
  getIgnDefaultScanURL,
  getIgnOrthophotoURL,
  getIgnScan25URL,
} from "pentatrion-geo/api";
import { createRasterStyle } from "pentatrion-geo/maplibre";
import {
  googleOrthophotoURL,
  osmURL,
  swissDefaultURL,
  swissOrthophotoURL,
  swissScan25URL,
} from "pentatrion-geo/url";
import { ignToken, maptilerToken } from "~/config/constants";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import { polygon } from "@turf/helpers";

const mapTilerStreetsStyleUrl = `https://api.maptiler.com/maps/streets/style.json?key=${maptilerToken}`;

const terrariumTiles = [
  "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
];

const googleStreetViewURLTiles = [
  "https://mts0.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts1.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts2.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts3.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
];

export type OptionalLayerInfo = {
  id: OptionalLayerId;
  beforeId?: string;
};

export type LayerInfos = BaseLayerInfos | OptionalLayerInfos;

export interface BaseLayerInfos {
  type: "base";
  dataType: "vector" | "raster";
  id: string;
  label: string;
  description?: string;
  style: string | StyleSpecification;
  optionalLayers: OptionalLayerInfo[];
  country: "fr" | "ch" | "world";
  offsetY: number; // position of the thumbnail in the layers sprite
}

export interface OptionalLayerInfos {
  type: "optional";
  id: string;
  label: string;
  description?: string;
  style: string | StyleSpecification;
  country: "fr" | "ch" | "world";
  offsetY: number;
}

export type BaseLayerId = keyof typeof baseLayersById;
export type OptionalLayerId = keyof typeof optionalLayersById;

export type BaseLayers = {
  fr: BaseLayerId[];
  ch: BaseLayerId[];
  world: BaseLayerId[];
};

export const baseLayers: BaseLayers = {
  fr: [
    "ign-raster-default_scan",
    "ign-raster-scan_25",
    "ign-raster-orthophoto",
    "ign-plan_ign-standard",
    // "ign-plan_ign-standard-non-optimized",
  ],
  ch: [
    "swisstopo-raster-orthophoto",
    "swisstopo-raster-default",
    "swisstopo-raster-default_25",
  ],
  world: [
    "osm-raster-default",
    // "google-raster-orthophoto",
    "maptiler-streets",
  ],
};

export const layerCountry: {
  [key in BaseLayerId]?: keyof BaseLayers;
} = {};
for (const countryId in baseLayers) {
  baseLayers[countryId as keyof BaseLayers].forEach((layerId) => {
    layerCountry[layerId] = countryId as keyof BaseLayers;
  });
}

export const countryBBoxes = {
  fr: {
    polygon: polygon([
      [
        [-6, 41],
        [-6, 51],
        [10, 51],
        [10, 41],
        [-6, 41],
      ],
    ]),
    bbox: new LngLatBounds([-6, 41], [10, 51]),
  },
  ch: {
    polygon: polygon([
      [
        [5.917, 46.145],
        [6.325, 46.153],
        [6.394, 46.336],
        [6.762, 46.336],
        [6.911, 45.974],
        [10.79, 46.423],
        [8.869, 48.143],
        [6.336, 46.836],
        [5.957, 46.259],
        [5.917, 46.145],
      ],
    ]),
    bbox: new LngLatBounds([5, 45], [11, 48]),
  },
};

export const baseLayersById = {
  "ign-raster-default_scan": {
    id: "ign-raster-default_scan",
    type: "base",
    dataType: "raster",
    label: "IGN Scan",
    offsetY: 0,
    style: createRasterStyle(
      [getIgnDefaultScanURL(ignToken)],
      '© <a href="https://www.ign.fr/">IGN</a>',
      18,
    ),
    optionalLayers: [
      { id: "ign-admin_express-adminexpress" },
      { id: "ign-pci-pci" },
    ],
    country: "fr",
  } satisfies BaseLayerInfos,
  "ign-raster-scan_25": {
    id: "ign-raster-scan_25",
    type: "base",
    dataType: "raster",
    label: "IGN Scan 25",
    offsetY: -54,
    style: createRasterStyle(
      [getIgnScan25URL(ignToken)],
      `© <a href="https://www.ign.fr/">IGN</a>`,
      16,
    ),
    optionalLayers: [
      { id: "ign-admin_express-adminexpress" },
      { id: "ign-pci-pci" },
    ],
    country: "fr",
  } satisfies BaseLayerInfos,
  "ign-raster-orthophoto": {
    id: "ign-raster-orthophoto",
    type: "base",
    dataType: "raster",
    label: "Satellite",
    offsetY: -108,
    style: createRasterStyle(
      [getIgnOrthophotoURL()],
      `© <a href="https://www.ign.fr/">IGN</a>`,
    ),
    optionalLayers: [
      { id: "ign-admin_express-adminexpress" },
      { id: "ign-pci-pci" },
      { id: "ign-isohypse-isohypse_monochrome_marron" },
      { id: "ign-plan_ign-toponymes" },
    ],
    country: "fr",
  } satisfies BaseLayerInfos,
  "ign-plan_ign-standard": {
    id: "ign-plan_ign-standard",
    type: "base",
    dataType: "vector",
    label: "Plan",
    description: "",
    offsetY: -162,
    style: "/assets/styles/ign/PLAN.IGN/standard.json",
    optionalLayers: [
      {
        id: "ign-admin_express-adminexpress",
        beforeId: "limite admin - limite de commune",
      },
      { id: "ign-pci-pci", beforeId: "point coté" },
      { id: "hillshade", beforeId: "bati surfacique - zone batie" },
    ],
    country: "fr",
  } satisfies BaseLayerInfos,
  "ign-plan_ign-standard-non-optimized": {
    id: "ign-plan_ign-non-standard",
    type: "base",
    dataType: "vector",
    label: "Plan",
    description: "",
    offsetY: -162,
    style: "/assets/styles/ign/PLAN.IGN/standard-non-optimized.json",
    optionalLayers: [
      {
        id: "ign-admin_express-adminexpress",
        beforeId: "limite admin - limite de commune",
      },
      { id: "ign-pci-pci", beforeId: "point coté" },
      { id: "hillshade" },
    ],
    country: "fr",
  } satisfies BaseLayerInfos,
  "swisstopo-raster-orthophoto": {
    id: "swisstopo-raster-orthophoto",
    type: "base",
    dataType: "raster",
    label: "Satellite",
    offsetY: -216,
    style: createRasterStyle(
      swissOrthophotoURL,
      `© Données: <a href="https://www.swisstopo.admin.ch">swisstopo</a>`,
    ),
    optionalLayers: [{ id: "hillshade" }],
    country: "ch",
  } satisfies BaseLayerInfos,
  "swisstopo-raster-default": {
    id: "swisstopo-raster-default",
    type: "base",
    dataType: "raster",
    label: "Scan",
    offsetY: -270,
    style: createRasterStyle(
      swissDefaultURL,
      `© Données: <a href="https://www.swisstopo.admin.ch">swisstopo</a>`,
    ),
    optionalLayers: [],
    country: "ch",
  } satisfies BaseLayerInfos,
  "swisstopo-raster-default_25": {
    id: "swisstopo-raster-default_25",
    type: "base",
    dataType: "raster",
    label: "Scan 1/25",
    offsetY: -324,
    style: createRasterStyle(
      swissScan25URL,
      `© Données: <a href="https://www.swisstopo.admin.ch">swisstopo</a>`,
    ),
    optionalLayers: [],
    country: "ch",
  } satisfies BaseLayerInfos,

  "osm-raster-default": {
    id: "osm-raster-default",
    type: "base",
    dataType: "raster",
    label: "OSM",
    offsetY: -378,
    style: createRasterStyle(
      osmURL,
      `© <a href="https://www.openstreetmap.org">Les Contributeurs d'OpenStreetMap</a>`,
    ),
    optionalLayers: [
      { id: "ign-admin_express-adminexpress" },
      { id: "ign-pci-pci" },
      { id: "ign-isohypse-isohypse_monochrome_marron" },
      { id: "hillshade" },
    ],
    country: "world",
  } satisfies BaseLayerInfos,
  "google-raster-orthophoto": {
    id: "google-raster-orthophoto",
    type: "base",
    dataType: "raster",
    label: "Google Sat",
    offsetY: -432,
    style: createRasterStyle(
      googleOrthophotoURL,
      `© Données cartographiques <a href="https://www.google.com">Google</a>`,
    ),
    optionalLayers: [
      { id: "ign-admin_express-adminexpress" },
      { id: "ign-pci-pci" },
      { id: "ign-isohypse-isohypse_monochrome_marron" },
      { id: "ign-plan_ign-toponymes" },
    ],

    country: "world",
  } satisfies BaseLayerInfos,
  "maptiler-streets": {
    id: "maptiler-streets",
    type: "base",
    dataType: "vector",
    label: "Plan",
    offsetY: -486,
    style: mapTilerStreetsStyleUrl,
    optionalLayers: [
      // not compatible because glyphs are differents
      // { id: "ign-admin_express-adminexpress" },
      // { id: "ign-pci-pci" },
      { id: "ign-isohypse-isohypse_monochrome_marron" },
      { id: "hillshade" },
    ],
    country: "world",
  } satisfies BaseLayerInfos,
};

export const optionalLayersById = {
  /** optionals */
  "ign-plan_ign-toponymes": {
    id: "ign-plan_ign-toponymes",
    type: "optional",
    label: "Libellés",
    description: "",
    offsetY: -648,
    style: "/assets/styles/ign/PLAN.IGN/toponymes.json",
    country: "fr",
  } satisfies OptionalLayerInfos,

  "ign-pci-pci": {
    id: "ign-pci-pci",
    type: "optional",
    label: "Cadastre",
    description: "",
    offsetY: -702,
    style: "/assets/styles/ign/PCI/pci.json",
    country: "fr",
  } satisfies OptionalLayerInfos,

  "ign-admin_express-adminexpress": {
    id: "ign-admin_express-adminexpress",
    type: "optional",
    label: "Frontières",
    description: "",
    offsetY: -594,
    style: "/assets/styles/ign/ADMIN_EXPRESS/adminexpress.json",
    country: "fr",
  } satisfies OptionalLayerInfos,

  "ign-isohypse-isohypse_monochrome_marron": {
    id: "ign-isohypse-isohypse_monochrome_marron",
    type: "optional",
    label: "Lignes niveau",
    description: "",
    offsetY: -756,
    style: "/assets/styles/ign/ISOHYPSE/isohypse_monochrome_marron.json",
    country: "fr",
  } satisfies OptionalLayerInfos,

  hillshade: {
    id: "hillshade",
    type: "optional",
    label: "Relief ombré",
    description: "",
    offsetY: -810,
    style: {
      version: 8,
      sources: {
        terrarium: {
          type: "raster-dem",
          tiles: terrariumTiles,
          tileSize: 256,
          encoding: "terrarium",
          maxzoom: 15,
        },
      },
      layers: [
        {
          id: "hillshade",
          type: "hillshade",
          source: "terrarium",
          paint: {
            "hillshade-exaggeration": 0.2,
          },
        },
      ],
    },
    country: "world",
  } satisfies OptionalLayerInfos,

  "street-view": {
    id: "street-view",
    type: "optional",
    label: "Street View",
    description: "",
    offsetY: -864,
    style: {
      version: 8,
      sources: {
        "streetview-raster": {
          type: "raster",
          tiles: googleStreetViewURLTiles,
          tileSize: 256,
        },
      },
      layers: [
        {
          source: "streetview-raster",
          id: "streetview-fill",
          type: "raster",
        },
      ],
    },
    country: "world",
  } satisfies OptionalLayerInfos,

  terrain: {
    id: "terrain",
    type: "optional",
    label: "Relief",
    description: "",
    offsetY: -540,
    style: {
      version: 8,
      sources: {
        terrarium: {
          type: "raster-dem",
          tiles: terrariumTiles,
          tileSize: 256,
          encoding: "terrarium",
          maxzoom: 15,
        },
      },
      layers: [],
    },
    country: "world",
  } satisfies OptionalLayerInfos,
};
