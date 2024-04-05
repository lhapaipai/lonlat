import {
  getIgnDefaultScanURL,
  getIgnOrthophotoURL,
  getIgnScan25URL,
  getSwissDefaultURL,
  getSwissOrthophotoURL,
  getSwissScan25URL,
  googleOrthophotoURL,
  osmURL,
} from "pentatrion-design";
import { ignToken, mapTilerStreetsStyleUrl } from "../shared/constants";

export interface LayerInfos {
  id: string;
  label: string;
  description?: string;
  thumbnail: string;
  style: string;
  type: "vector" | "raster";
  layers: string[]; // LayerId[] disabled circular reference
  country: "fr" | "ch" | "world";
}

export type LayerId = keyof typeof layersById;

export const layers: LayerId[] = [];

export type BaseLayers = {
  fr: LayerId[];
  ch: LayerId[];
  world: LayerId[];
};
export const baseLayers: BaseLayers = {
  fr: [
    "ign-raster-default_scan",
    "ign-raster-scan_25",
    "ign-raster-orthophoto",
    "ign-plan_ign-standard",
  ],
  ch: ["swiss-raster-orthophoto", "swiss-raster-default", "swiss-raster-default_25"],
  world: ["osm-raster-default", "google-raster-orthophoto", "maptiler"],
};

export const countryLabels = {
  fr: "France",
  ch: "Suisse",
  world: "Monde",
};

const additionalLayers = [
  "ign-plan_ign-toponymes",
  "ign-pci-pci",
  "ign-admin_express-adminexpress",
  "ign-isohypse-isohypse_monochrome_marron",
] as const;

export const layersById = {
  "ign-raster-default_scan": {
    id: "ign-raster-default_scan",
    type: "raster",
    label: "IGN Scan",
    thumbnail: "/styles/ign/raster/default_scan.png",
    style: getIgnDefaultScanURL(ignToken),
    layers: ["ign-admin_express-adminexpress"],
    country: "fr",
  } satisfies LayerInfos,
  "ign-raster-scan_25": {
    id: "ign-raster-scan_25",
    type: "raster",
    label: "IGN Scan 25",
    thumbnail: "/styles/ign/raster/scan_25.png",
    style: getIgnScan25URL(ignToken),
    layers: ["ign-admin_express-adminexpress"],
    country: "fr",
  } satisfies LayerInfos,
  "ign-raster-orthophoto": {
    id: "ign-raster-orthophoto",
    type: "raster",
    label: "Satellite",
    thumbnail: "/styles/ign/raster/orthophoto.png",
    style: getIgnOrthophotoURL(),
    layers: [
      "ign-admin_express-adminexpress",
      "ign-pci-pci",
      "ign-isohypse-isohypse_monochrome_marron",
      "ign-plan_ign-toponymes",
    ],
    country: "fr",
  } satisfies LayerInfos,
  "ign-plan_ign-standard": {
    id: "ign-plan_ign-standard",
    type: "vector",
    label: "Plan",
    description: "",
    thumbnail: "/styles/ign/PLAN.IGN/standard.png",
    style: "/styles/ign/PLAN.IGN/standard.json",
    layers: [],
    country: "fr",
  } satisfies LayerInfos,

  "swiss-raster-orthophoto": {
    id: "swiss-raster-orthophoto",
    type: "raster",
    label: "Satellite",
    thumbnail: "/styles/swiss/orthophoto.png",
    style: getSwissOrthophotoURL(),
    layers: [],
    country: "ch",
  } satisfies LayerInfos,
  "swiss-raster-default": {
    id: "swiss-raster-default",
    type: "raster",
    label: "Scan",
    thumbnail: "/styles/swiss/default.png",
    style: getSwissDefaultURL(),
    layers: [],
    country: "ch",
  } satisfies LayerInfos,
  "swiss-raster-default_25": {
    id: "swiss-raster-default_25",
    type: "raster",
    label: "Scan 1/25",
    thumbnail: "/styles/swiss/default_25.png",
    style: getSwissScan25URL(),
    layers: [],
    country: "ch",
  } satisfies LayerInfos,

  "osm-raster-default": {
    id: "osm-raster-default",
    type: "raster",
    label: "OSM",
    thumbnail: "/styles/osm/default.png",
    style: osmURL,
    layers: [
      "ign-admin_express-adminexpress",
      "ign-pci-pci",
      "ign-isohypse-isohypse_monochrome_marron",
    ],
    country: "world",
  } satisfies LayerInfos,
  "google-raster-orthophoto": {
    id: "google-raster-orthophoto",
    type: "raster",
    label: "Google Sat",
    thumbnail: "/styles/google/orthophoto.png",
    style: googleOrthophotoURL,
    layers: ["ign-isohypse-isohypse_monochrome_marron"],
    country: "world",
  } satisfies LayerInfos,
  maptiler: {
    id: "maptiler",
    type: "vector",
    label: "Plan",
    thumbnail: "/styles/maptiler/streets.png",
    style: mapTilerStreetsStyleUrl,
    layers: [
      "ign-admin_express-adminexpress",
      "ign-pci-pci",
      "ign-isohypse-isohypse_monochrome_marron",
    ],
    country: "world",
  } satisfies LayerInfos,

  /** optionals */
  "ign-plan_ign-toponymes": {
    id: "ign-plan_ign-toponymes",
    type: "vector",
    label: "Libellés",
    description: "",
    thumbnail: "/styles/ign/PLAN.IGN/toponymes.png",
    style: "/styles/ign/PLAN.IGN/toponymes.json",
    layers: [],
    country: "fr",
  } satisfies LayerInfos,

  "ign-pci-pci": {
    id: "ign-pci-pci",
    type: "vector",
    label: "Cadastre",
    description: "",
    thumbnail: "/styles/ign/PCI/pci.png",
    style: "/styles/ign/PCI/pci.json",
    layers: [],
    country: "fr",
  } satisfies LayerInfos,

  "ign-admin_express-adminexpress": {
    id: "ign-admin_express-adminexpress",
    type: "vector",
    label: "Frontières",
    description: "",
    thumbnail: "/styles/ign/ADMIN_EXPRESS/adminexpress.png",
    style: "/styles/ign/ADMIN_EXPRESS/adminexpress.json",
    layers: [],
    country: "fr",
  } satisfies LayerInfos,

  "ign-isohypse-isohypse_monochrome_marron": {
    id: "ign-isohypse-isohypse_monochrome_marron",
    type: "vector",
    label: "Lignes niveau",
    description: "",
    thumbnail: "/styles/ign/ISOHYPSE/isohypse_monochrome_marron.png",
    style: "/styles/ign/ISOHYPSE/isohypse_monochrome_marron.json",
    layers: [],
    country: "fr",
  } satisfies LayerInfos,
};
