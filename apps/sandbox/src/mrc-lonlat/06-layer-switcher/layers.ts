import {
  getIgnCadastreURL,
  getIgnDefaultScanURL,
  getIgnExpressURL,
  getIgnOrthophotoURL,
  getIgnScan25URL,
  getIgnStreetsURL,
  swissDefaultURL,
  swissOrthophotoURL,
  swissScan25URL,
  googleOrthophotoURL,
  googleReliefURL,
  googleRoadURL,
  googleStreetViewURL,
  osmURL,
} from "pentatrion-geo";
import { ignToken, mapTilerStreetsStyleUrl } from "~/shared/constants";

export interface LayerInfos {
  id: string;
  label: string;
  description?: string;
  offsetY: number;
  style: string | string[];
  type: "vector" | "raster";
}

export type LayerId = keyof typeof layersById;

export const layers: LayerId[] = [
  "maplibre",
  "ign-raster-cadastre",
  "ign-raster-default_scan",
  "ign-raster-scan_25",
  "ign-raster-orthophoto",
  "ign-raster-express",
  "ign-raster-streets",
  "osm-raster-default",
  "google-raster-orthophoto",
  "google-raster-road",
  "google-raster-relief",
  "google-raster-street_view",
  "swisstopo-raster-orthophoto",
  "swisstopo-raster-default",
  "swisstopo-raster-default_25",
  "maptiler",
  "etalab-osm_bright",
  "ign-admin_express-adminexpress",
  "ign-bd_topo-classique",
  "ign-bd_topo-bati",
  "ign-bd_topo-hydrographie",
  "ign-bd_topo-routier",
  "ign-bd_topo-bati_date",
  "ign-bd_topo-bati_etages",
  "ign-isohypse-isohypse_multicolore",
  "ign-isohypse-isohypse_monochrome_marron",
  "ign-isohypse-isohypse_monochrome_orange",
  // "ign-ocsge-ocsge_couverture",
  // "ign-ocsge-ocsge_usage",
  // "ign-ocsge-ocsge_occupation",
  "ign-pci-noir_et_blanc",
  "ign-pci-pci",
  "ign-plan_ign-standard",
  "ign-plan_ign-attenue",
  "ign-plan_ign-gris",
  "ign-plan_ign-sans_toponymes",
  "ign-plan_ign-toponymes",
  "ign-plan_ign-accentue",
  "ign-plan_ign-classique",
  "ign-plan_ign-epure",
];

export const layersById = {
  maplibre: {
    id: "maplibre",
    type: "vector",
    label: "Maplibre",
    offsetY: -2160,
    style: "https://demotiles.maplibre.org/style.json",
  } satisfies LayerInfos,

  "ign-raster-cadastre": {
    id: "ign-raster-cadastre",
    type: "raster",
    label: "IGN Cadastre",
    offsetY: -1404,
    style: getIgnCadastreURL(),
  } satisfies LayerInfos,
  "ign-raster-default_scan": {
    id: "ign-raster-default_scan",
    type: "raster",
    label: "IGN Scan",
    offsetY: -1458,
    style: getIgnDefaultScanURL(ignToken),
  } satisfies LayerInfos,
  "ign-raster-scan_25": {
    id: "ign-raster-scan_25",
    type: "raster",
    label: "IGN Scan 25",
    offsetY: -1620,
    style: getIgnScan25URL(ignToken),
  } satisfies LayerInfos,
  "ign-raster-orthophoto": {
    id: "ign-raster-orthophoto",
    type: "raster",
    label: "IGN Orthophoto",
    offsetY: -1566,
    style: getIgnOrthophotoURL(),
  } satisfies LayerInfos,
  "ign-raster-express": {
    id: "ign-raster-express",
    type: "raster",
    label: "IGN Express",
    offsetY: -1512,
    style: getIgnExpressURL(),
  } satisfies LayerInfos,
  "ign-raster-streets": {
    id: "ign-raster-streets",
    type: "raster",
    label: "IGN Streets",
    offsetY: -1674,
    style: getIgnStreetsURL(),
  } satisfies LayerInfos,
  "osm-raster-default": {
    id: "osm-raster-default",
    type: "raster",
    label: "OSM",
    offsetY: -1782,
    style: osmURL,
  } satisfies LayerInfos,
  "google-raster-orthophoto": {
    id: "google-raster-orthophoto",
    type: "raster",
    label: "Google Orthophoto",
    offsetY: -54,
    style: googleOrthophotoURL,
  } satisfies LayerInfos,
  "google-raster-road": {
    id: "google-raster-road",
    type: "raster",
    label: "Google Road",
    offsetY: -162,
    style: googleRoadURL,
  } satisfies LayerInfos,
  "google-raster-relief": {
    id: "google-raster-relief",
    type: "raster",
    label: "Google relief",
    offsetY: -108,
    style: googleReliefURL,
  } satisfies LayerInfos,
  "google-raster-street_view": {
    id: "google-raster-street_view",
    type: "raster",
    label: "Google Street View",
    offsetY: -216,
    style: googleStreetViewURL,
  } satisfies LayerInfos,
  "swisstopo-raster-orthophoto": {
    id: "swisstopo-raster-orthophoto",
    type: "raster",
    label: "Swiss Orthophoto",
    offsetY: -1998,
    style: swissOrthophotoURL,
  } satisfies LayerInfos,
  "swisstopo-raster-default": {
    id: "swisstopo-raster-default",
    type: "raster",
    label: "Swiss défaut",
    offsetY: -1890,
    style: swissDefaultURL,
  } satisfies LayerInfos,
  "swisstopo-raster-default_25": {
    id: "swisstopo-raster-default_25",
    type: "raster",
    label: "Swiss 1/25",
    offsetY: -1944,
    style: swissScan25URL,
  } satisfies LayerInfos,
  maptiler: {
    id: "maptiler",
    type: "vector",
    label: "Maptiler Streets",
    offsetY: -1728,
    style: mapTilerStreetsStyleUrl,
  } satisfies LayerInfos,
  /* tuiles vectorielles */
  "etalab-osm_bright": {
    id: "etalab-osm_bright",
    type: "vector",
    label: "Etalab bright",
    offsetY: 0,
    style: "/assets/styles-original/etalab/osm_bright.json",
  } satisfies LayerInfos,
  "ign-admin_express-adminexpress": {
    id: "ign-admin_express-adminexpress",
    type: "vector",
    label: "Admin Express",
    description: "",
    offsetY: -324,
    style: "/assets/styles-original/ign/ADMIN_EXPRESS/adminexpress.json",
  } satisfies LayerInfos,
  "ign-bd_topo-classique": {
    id: "ign-bd_topo-classique",
    type: "vector",
    label: "Topo Classique",
    description: "",
    offsetY: -540,
    style: "/assets/styles-original/ign/BDTOPO/classique.json",
  } satisfies LayerInfos,
  "ign-bd_topo-bati": {
    id: "ign-bd_topo-bati",
    type: "vector",
    label: "Topo Bati",
    description: "",
    offsetY: -378,
    style: "/assets/styles-original/ign/BDTOPO/bati.json",
  } satisfies LayerInfos,
  "ign-bd_topo-hydrographie": {
    id: "ign-bd_topo-hydrographie",
    type: "vector",
    label: "Topo Hydrographie",
    description: "",
    offsetY: -594,
    style: "/assets/styles-original/ign/BDTOPO/hydrographie.json",
  } satisfies LayerInfos,
  "ign-bd_topo-routier": {
    id: "ign-bd_topo-routier",
    type: "vector",
    label: "Topo Routier",
    description: "",
    offsetY: -648,
    style: "/assets/styles-original/ign/BDTOPO/routier.json",
  } satisfies LayerInfos,
  "ign-bd_topo-bati_date": {
    id: "ign-bd_topo-bati_date",
    type: "vector",
    label: "Topo Bati date",
    description: "",
    offsetY: -432,
    style: "/assets/styles-original/ign/BDTOPO/bati_date.json",
  } satisfies LayerInfos,
  "ign-bd_topo-bati_etages": {
    id: "ign-bd_topo-bati_etages",
    type: "vector",
    label: "Topo Bati étages",
    description: "",
    offsetY: -486,
    style: "/assets/styles-original/ign/BDTOPO/bati_etages.json",
  } satisfies LayerInfos,
  "ign-isohypse-isohypse_multicolore": {
    id: "ign-isohypse-isohypse_multicolore",
    type: "vector",
    label: "Isohypse multi",
    description: "",
    offsetY: -810,
    style: "/assets/styles-original/ign/ISOHYPSE/isohypse_multicolore.json",
  } satisfies LayerInfos,
  "ign-isohypse-isohypse_monochrome_marron": {
    id: "ign-isohypse-isohypse_monochrome_marron",
    type: "vector",
    label: "Isohypse marron",
    description: "",
    offsetY: -702,
    style:
      "/assets/styles-original/ign/ISOHYPSE/isohypse_monochrome_marron.json",
  } satisfies LayerInfos,
  "ign-isohypse-isohypse_monochrome_orange": {
    id: "ign-isohypse-isohypse_monochrome_orange",
    type: "vector",
    label: "Isohypse orange",
    description: "",
    offsetY: -756,
    style:
      "/assets/styles-original/ign/ISOHYPSE/isohypse_monochrome_orange.json",
  } satisfies LayerInfos,
  "ign-ocsge-ocsge_couverture": {
    id: "ign-ocsge-ocsge_couverture",
    type: "vector",
    label: "OCS couverture",
    description: "",
    offsetY: -2160,
    style: "/assets/styles-original/ign/OCSGE/ocsge_couverture.json",
  } satisfies LayerInfos,
  "ign-ocsge-ocsge_usage": {
    id: "ign-ocsge-ocsge_usage",
    type: "vector",
    label: "OCS Usage",
    description: "",
    offsetY: -2160,
    style: "/assets/styles-original/ign/OCSGE/ocsge_usage.json",
  } satisfies LayerInfos,
  "ign-ocsge-ocsge_occupation": {
    id: "ign-ocsge-ocsge_occupation",
    type: "vector",
    label: "OCS Occupation",
    description: "",
    offsetY: -2160,
    style: "/assets/styles-original/ign/OCSGE/ocsge_occupation.json",
  } satisfies LayerInfos,
  "ign-pci-noir_et_blanc": {
    id: "ign-pci-noir_et_blanc",
    type: "vector",
    label: "Parcellaire n&b",
    description: "",
    offsetY: -864,
    style: "/assets/styles-original/ign/PCI/noir_et_blanc.json",
  } satisfies LayerInfos,
  "ign-pci-pci": {
    id: "ign-pci-pci",
    type: "vector",
    label: "Parcellaire",
    description: "",
    offsetY: -918,
    style: "/assets/styles-original/ign/PCI/pci.json",
  } satisfies LayerInfos,
  "ign-plan_ign-standard": {
    id: "ign-plan_ign-standard",
    type: "vector",
    label: "Plan standard",
    description: "",
    offsetY: -1296,
    style: "/assets/styles-original/ign/PLAN.IGN/standard.json",
  } satisfies LayerInfos,
  "ign-plan_ign-attenue": {
    id: "ign-plan_ign-attenue",
    type: "vector",
    label: "Plan attenué",
    description: "",
    offsetY: -1026,
    style: "/assets/styles-original/ign/PLAN.IGN/attenue.json",
  } satisfies LayerInfos,
  "ign-plan_ign-gris": {
    id: "ign-plan_ign-gris",
    type: "vector",
    label: "Plan gris",
    description: "",
    offsetY: -1188,
    style: "/assets/styles-original/ign/PLAN.IGN/gris.json",
  } satisfies LayerInfos,
  "ign-plan_ign-sans_toponymes": {
    id: "ign-plan_ign-sans_toponymes",
    type: "vector",
    label: "Plan sans toponymes",
    description: "",
    offsetY: -1242,
    style: "/assets/styles-original/ign/PLAN.IGN/sans_toponymes.json",
  } satisfies LayerInfos,
  "ign-plan_ign-toponymes": {
    id: "ign-plan_ign-toponymes",
    type: "vector",
    label: "Toponymes",
    description: "",
    offsetY: -1350,
    style: "/assets/styles-original/ign/PLAN.IGN/toponymes.json",
  } satisfies LayerInfos,
  "ign-plan_ign-accentue": {
    id: "ign-plan_ign-accentue",
    type: "vector",
    label: "Plan accentué",
    description: "",
    offsetY: -972,
    style: "/assets/styles-original/ign/PLAN.IGN/accentue.json",
  } satisfies LayerInfos,
  "ign-plan_ign-classique": {
    id: "ign-plan_ign-classique",
    type: "vector",
    label: "Plan classique",
    description: "",
    offsetY: -1080,
    style: "/assets/styles-original/ign/PLAN.IGN/classique.json",
  } satisfies LayerInfos,
  "ign-plan_ign-epure": {
    id: "ign-plan_ign-epure",
    type: "vector",
    label: "Plan épuré",
    description: "",
    offsetY: -1134,
    style: "/assets/styles-original/ign/PLAN.IGN/epure.json",
  } satisfies LayerInfos,
};
