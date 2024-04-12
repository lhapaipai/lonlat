import {
  createRasterStyle,
  getIgnDefaultScanURL,
  getIgnOrthophotoURL,
  getIgnScan25URL,
  swissDefaultURL,
  swissOrthophotoURL,
  swissScan25URL,
  googleOrthophotoURL,
  osmURL,
} from "pentatrion-geo";
import { ignToken, mapTilerStreetsStyleUrl } from "../shared/constants";
import { StyleSpecification } from "maplibre-gl";

const terrariumTiles = ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"];

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
  thumbnail: string;
  style: string | StyleSpecification;
  optionalLayers: OptionalLayerInfo[];
  country: "fr" | "ch" | "world";
}

export interface OptionalLayerInfos {
  type: "optional";
  id: string;
  label: string;
  description?: string;
  thumbnail: string;
  style: string | StyleSpecification;
  country: "fr" | "ch" | "world";
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
  ],
  ch: ["swisstopo-raster-orthophoto", "swisstopo-raster-default", "swisstopo-raster-default_25"],
  world: ["osm-raster-default", "google-raster-orthophoto", "maptiler"],
};

export const countryLabels = {
  fr: "France",
  ch: "Suisse",
  world: "Monde",
};

export const baseLayersById = {
  "ign-raster-default_scan": {
    id: "ign-raster-default_scan",
    type: "base",
    dataType: "raster",
    label: "IGN Scan",
    thumbnail: "/styles/ign/raster/default_scan.png",
    style: createRasterStyle(getIgnDefaultScanURL(ignToken)),
    optionalLayers: [{ id: "ign-admin_express-adminexpress" }],
    country: "fr",
  } satisfies BaseLayerInfos,
  "ign-raster-scan_25": {
    id: "ign-raster-scan_25",
    type: "base",
    dataType: "raster",
    label: "IGN Scan 25",
    thumbnail: "/styles/ign/raster/scan_25.png",
    style: createRasterStyle(getIgnScan25URL(ignToken)),
    optionalLayers: [{ id: "ign-admin_express-adminexpress" }],
    country: "fr",
  } satisfies BaseLayerInfos,
  "ign-raster-orthophoto": {
    id: "ign-raster-orthophoto",
    type: "base",
    dataType: "raster",
    label: "Satellite",
    thumbnail: "/styles/ign/raster/orthophoto.png",
    style: createRasterStyle(getIgnOrthophotoURL()),
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
    thumbnail: "/styles/ign/PLAN.IGN/standard.png",
    style: "/enhanced-styles/ign/PLAN.IGN/standard.json",
    optionalLayers: [
      { id: "ign-admin_express-adminexpress", beforeId: "limite admin - limite de commune" },
      { id: "ign-pci-pci", beforeId: "point coté" },
    ],
    country: "fr",
  } satisfies BaseLayerInfos,

  "swisstopo-raster-orthophoto": {
    id: "swisstopo-raster-orthophoto",
    type: "base",
    dataType: "raster",
    label: "Satellite",
    thumbnail: "/styles/swiss/orthophoto.png",
    style: createRasterStyle(swissOrthophotoURL),
    optionalLayers: [],
    country: "ch",
  } satisfies BaseLayerInfos,
  "swisstopo-raster-default": {
    id: "swisstopo-raster-default",
    type: "base",
    dataType: "raster",
    label: "Scan",
    thumbnail: "/styles/swiss/default.png",
    style: createRasterStyle(swissDefaultURL),
    optionalLayers: [],
    country: "ch",
  } satisfies BaseLayerInfos,
  "swisstopo-raster-default_25": {
    id: "swisstopo-raster-default_25",
    type: "base",
    dataType: "raster",
    label: "Scan 1/25",
    thumbnail: "/styles/swiss/default_25.png",
    style: createRasterStyle(swissScan25URL),
    optionalLayers: [],
    country: "ch",
  } satisfies BaseLayerInfos,

  "osm-raster-default": {
    id: "osm-raster-default",
    type: "base",
    dataType: "raster",
    label: "OSM",
    thumbnail: "/styles/osm/default.png",
    style: createRasterStyle(osmURL),
    optionalLayers: [
      { id: "ign-admin_express-adminexpress" },
      { id: "ign-pci-pci" },
      { id: "ign-isohypse-isohypse_monochrome_marron" },
    ],
    country: "world",
  } satisfies BaseLayerInfos,
  "google-raster-orthophoto": {
    id: "google-raster-orthophoto",
    type: "base",
    dataType: "raster",
    label: "Google Sat",
    thumbnail: "/styles/google/orthophoto.png",
    style: createRasterStyle(googleOrthophotoURL),
    optionalLayers: [{ id: "ign-isohypse-isohypse_monochrome_marron" }],
    country: "world",
  } satisfies BaseLayerInfos,
  maptiler: {
    id: "maptiler",
    type: "base",
    dataType: "vector",
    label: "Plan",
    thumbnail: "/styles/maptiler/streets.png",
    style: mapTilerStreetsStyleUrl,
    optionalLayers: [
      { id: "ign-admin_express-adminexpress" },
      { id: "ign-pci-pci" },
      { id: "ign-isohypse-isohypse_monochrome_marron" },
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
    thumbnail: "/styles/ign/PLAN.IGN/toponymes.png",
    style: "/enhanced-styles/ign/PLAN.IGN/toponymes.json",
    country: "fr",
  } satisfies OptionalLayerInfos,

  "ign-pci-pci": {
    id: "ign-pci-pci",
    type: "optional",
    label: "Cadastre",
    description: "",
    thumbnail: "/styles/ign/PCI/pci.png",
    style: "/enhanced-styles/ign/PCI/pci.json",
    country: "fr",
  } satisfies OptionalLayerInfos,

  "ign-admin_express-adminexpress": {
    id: "ign-admin_express-adminexpress",
    type: "optional",
    label: "Frontières",
    description: "",
    thumbnail: "/styles/ign/ADMIN_EXPRESS/adminexpress.png",
    style: "/enhanced-styles/ign/ADMIN_EXPRESS/adminexpress.json",
    country: "fr",
  } satisfies OptionalLayerInfos,

  "ign-isohypse-isohypse_monochrome_marron": {
    id: "ign-isohypse-isohypse_monochrome_marron",
    type: "optional",
    label: "Lignes niveau",
    description: "",
    thumbnail: "/styles/ign/ISOHYPSE/isohypse_monochrome_marron.png",
    style: "/enhanced-styles/ign/ISOHYPSE/isohypse_monochrome_marron.json",
    country: "fr",
  } satisfies OptionalLayerInfos,

  hillshade: {
    id: "hillshade",
    type: "optional",
    label: "Relief ombré",
    description: "",
    thumbnail: "/thumbnail/terrarium.jpg",
    style: {
      version: 8,
      sources: {
        terrarium: {
          type: "raster-dem",
          tiles: terrariumTiles,
          tileSize: 256,
          encoding: "terrarium",
        },
      },
      layers: [
        {
          id: "hillshade",
          type: "hillshade",
          source: "terrarium",
          paint: {
            "hillshade-exaggeration": 0.25,
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
    thumbnail: "/thumbnail/pegman.png",
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
    thumbnail: "/thumbnail/terrain.jpg",
    style: {
      version: 8,
      sources: {
        terrarium: {
          type: "raster-dem",
          tiles: terrariumTiles,
          tileSize: 256,
          encoding: "terrarium",
        },
      },
      layers: [],
    },
    country: "world",
  } satisfies OptionalLayerInfos,
};
