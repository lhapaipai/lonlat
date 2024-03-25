import {
  getIgnCadastreURL,
  getIgnDefaultScanURL,
  getIgnExpressURL,
  getIgnOrthophotoURL,
  getIgnScan25URL,
  getIgnStreetsURL,
  getSwissDefaultURL,
  getSwissOrthophotoURL,
  getSwissScan25URL,
  googleOrthophotoURL,
  googleReliefURL,
  googleRoadURL,
  googleStreetViewURL,
  osmURL,
} from "pentatrion-design";
import { ignToken } from "../shared/constants";

export interface LayerInfos {
  id: string;
  label: string;
  description?: string;
  thumbnail: string;
  style: string;
  type: "vector" | "raster";
}

export type LayerId = keyof typeof layersById;

export const layers: LayerId[] = [
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
  "swiss-raster-orthophoto",
  "swiss-raster-default",
  "swiss-raster-default_25",
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
  "ign-raster-cadastre": {
    id: "ign-raster-cadastre",
    type: "raster",
    label: "IGN Cadastre",
    thumbnail: "/styles/ign/thumbnails/ign-raster-cadastre.png",
    style: getIgnCadastreURL(),
  } satisfies LayerInfos,
  "ign-raster-default_scan": {
    id: "ign-raster-default_scan",
    type: "raster",
    label: "IGN Scan",
    thumbnail: "/styles/ign/thumbnails/ign-raster-default_scan.png",
    style: getIgnDefaultScanURL(ignToken),
  } satisfies LayerInfos,
  "ign-raster-scan_25": {
    id: "ign-raster-scan_25",
    type: "raster",
    label: "IGN Scan 25",
    thumbnail: "/styles/ign/thumbnails/ign-raster-scan_25.png",
    style: getIgnScan25URL(ignToken),
  } satisfies LayerInfos,
  "ign-raster-orthophoto": {
    id: "ign-raster-orthophoto",
    type: "raster",
    label: "IGN Orthophoto",
    thumbnail: "/styles/ign/thumbnails/ign-raster-orthophoto.png",
    style: getIgnOrthophotoURL(),
  } satisfies LayerInfos,
  "ign-raster-express": {
    id: "ign-raster-express",
    type: "raster",
    label: "IGN Express",
    thumbnail: "/styles/ign/thumbnails/ign-raster-express.png",
    style: getIgnExpressURL(),
  } satisfies LayerInfos,
  "ign-raster-streets": {
    id: "ign-raster-streets",
    type: "raster",
    label: "IGN Streets",
    thumbnail: "/styles/ign/thumbnails/ign-raster-streets.png",
    style: getIgnStreetsURL(),
  } satisfies LayerInfos,
  "osm-raster-default": {
    id: "osm-raster-default",
    type: "raster",
    label: "OSM",
    thumbnail: "/styles/osm/osm-raster-default.png",
    style: osmURL,
  } satisfies LayerInfos,
  "google-raster-orthophoto": {
    id: "google-raster-orthophoto",
    type: "raster",
    label: "Google Orthophoto",
    thumbnail: "/styles/google/google-raster-orthophoto.png",
    style: googleOrthophotoURL,
  } satisfies LayerInfos,
  "google-raster-road": {
    id: "google-raster-road",
    type: "raster",
    label: "Google Road",
    thumbnail: "/styles/google/google-raster-road.png",
    style: googleRoadURL,
  } satisfies LayerInfos,
  "google-raster-relief": {
    id: "google-raster-relief",
    type: "raster",
    label: "Google relief",
    thumbnail: "/styles/google/google-raster-relief.png",
    style: googleReliefURL,
  } satisfies LayerInfos,
  "google-raster-street_view": {
    id: "google-raster-street_view",
    type: "raster",
    label: "Google Street View",
    thumbnail: "/styles/google/google-raster-street_view.png",
    style: googleStreetViewURL,
  } satisfies LayerInfos,
  "swiss-raster-orthophoto": {
    id: "swiss-raster-orthophoto",
    type: "raster",
    label: "Swiss Orthophoto",
    thumbnail: "/styles/swiss/swiss-raster-orthophoto.png",
    style: getSwissOrthophotoURL(),
  } satisfies LayerInfos,
  "swiss-raster-default": {
    id: "swiss-raster-default",
    type: "raster",
    label: "Swiss défaut",
    thumbnail: "/styles/swiss/swiss-raster-default.png",
    style: getSwissDefaultURL(),
  } satisfies LayerInfos,
  "swiss-raster-default_25": {
    id: "swiss-raster-default_25",
    type: "raster",
    label: "Swiss 1/25",
    thumbnail: "/styles/swiss/swiss-raster-default_25.png",
    style: getSwissScan25URL(),
  } satisfies LayerInfos,
  maptiler: {
    id: "maptiler",
    type: "vector",
    label: "Maptiler Streets",
    thumbnail: "/styles/maptiler/maptiler-streets.png",
    style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  } satisfies LayerInfos,
  /* tuiles vectorielles */
  "etalab-osm_bright": {
    id: "etalab-osm_bright",
    type: "vector",
    label: "Etalab bright",
    thumbnail: "/styles/etalab/etalab-osm_bright.png",
    style: "/styles/etalab/osm_bright.json",
  } satisfies LayerInfos,
  "ign-admin_express-adminexpress": {
    id: "ign-admin_express-adminexpress",
    type: "vector",
    label: "Admin Express",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-admin_express-adminexpress.png",
    style: "/styles/ign/ADMIN_EXPRESS/adminexpress.json",
  } satisfies LayerInfos,
  "ign-bd_topo-classique": {
    id: "ign-bd_topo-classique",
    type: "vector",
    label: "Topo Classique",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-bd_topo-classique.png",
    style: "/styles/ign/BDTOPO/classique.json",
  } satisfies LayerInfos,
  "ign-bd_topo-bati": {
    id: "ign-bd_topo-bati",
    type: "vector",
    label: "Topo Bati",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-bd_topo-bati.png",
    style: "/styles/ign/BDTOPO/bati.json",
  } satisfies LayerInfos,
  "ign-bd_topo-hydrographie": {
    id: "ign-bd_topo-hydrographie",
    type: "vector",
    label: "Topo Hydrographie",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-bd_topo-hydrographie.png",
    style: "/styles/ign/BDTOPO/hydrographie.json",
  } satisfies LayerInfos,
  "ign-bd_topo-routier": {
    id: "ign-bd_topo-routier",
    type: "vector",
    label: "Topo Routier",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-bd_topo-routier.png",
    style: "/styles/ign/BDTOPO/routier.json",
  } satisfies LayerInfos,
  "ign-bd_topo-bati_date": {
    id: "ign-bd_topo-bati_date",
    type: "vector",
    label: "Topo Bati date",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-bd_topo-bati_date.png",
    style: "/styles/ign/BDTOPO/bati_date.json",
  } satisfies LayerInfos,
  "ign-bd_topo-bati_etages": {
    id: "ign-bd_topo-bati_etages",
    type: "vector",
    label: "Topo Bati étages",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-bd_topo-bati_etages.png",
    style: "/styles/ign/BDTOPO/bati_etages.json",
  } satisfies LayerInfos,
  "ign-isohypse-isohypse_multicolore": {
    id: "ign-isohypse-isohypse_multicolore",
    type: "vector",
    label: "Isohypse multi",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-isohypse-isohypse_multicolore.png",
    style: "/styles/ign/ISOHYPSE/isohypse_multicolore.json",
  } satisfies LayerInfos,
  "ign-isohypse-isohypse_monochrome_marron": {
    id: "ign-isohypse-isohypse_monochrome_marron",
    type: "vector",
    label: "Isohypse marron",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-isohypse-isohypse_monochrome_marron.png",
    style: "/styles/ign/ISOHYPSE/isohypse_monochrome_marron.json",
  } satisfies LayerInfos,
  "ign-isohypse-isohypse_monochrome_orange": {
    id: "ign-isohypse-isohypse_monochrome_orange",
    type: "vector",
    label: "Isohypse orange",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-isohypse-isohypse_monochrome_orange.png",
    style: "/styles/ign/ISOHYPSE/isohypse_monochrome_orange.json",
  } satisfies LayerInfos,
  "ign-ocsge-ocsge_couverture": {
    id: "ign-ocsge-ocsge_couverture",
    type: "vector",
    label: "OCS couverture",
    description: "",
    thumbnail: "/styles/ign/thumbnails/.png",
    style: "/styles/ign/OCSGE/ocsge_couverture.json",
  } satisfies LayerInfos,
  "ign-ocsge-ocsge_usage": {
    id: "ign-ocsge-ocsge_usage",
    type: "vector",
    label: "OCS Usage",
    description: "",
    thumbnail: "/styles/ign/thumbnails/.png",
    style: "/styles/ign/OCSGE/ocsge_usage.json",
  } satisfies LayerInfos,
  "ign-ocsge-ocsge_occupation": {
    id: "ign-ocsge-ocsge_occupation",
    type: "vector",
    label: "OCS Occupation",
    description: "",
    thumbnail: "/styles/ign/thumbnails/.png",
    style: "/styles/ign/OCSGE/ocsge_occupation.json",
  } satisfies LayerInfos,
  "ign-pci-noir_et_blanc": {
    id: "ign-pci-noir_et_blanc",
    type: "vector",
    label: "Parcellaire n&b",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-pci-noir_et_blanc.png",
    style: "/styles/ign/PCI/noir_et_blanc.json",
  } satisfies LayerInfos,
  "ign-pci-pci": {
    id: "ign-pci-pci",
    type: "vector",
    label: "Parcellaire",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-pci-pci.png",
    style: "/styles/ign/PCI/pci.json",
  } satisfies LayerInfos,
  "ign-plan_ign-standard": {
    id: "ign-plan_ign-standard",
    type: "vector",
    label: "Plan standard",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-plan_ign-standard.png",
    style: "/styles/ign/PLAN.IGN/standard.json",
  } satisfies LayerInfos,
  "ign-plan_ign-attenue": {
    id: "ign-plan_ign-attenue",
    type: "vector",
    label: "Plan attenué",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-plan_ign-attenue.png",
    style: "/styles/ign/PLAN.IGN/attenue.json",
  } satisfies LayerInfos,
  "ign-plan_ign-gris": {
    id: "ign-plan_ign-gris",
    type: "vector",
    label: "Plan gris",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-plan_ign-gris.png",
    style: "/styles/ign/PLAN.IGN/gris.json",
  } satisfies LayerInfos,
  "ign-plan_ign-sans_toponymes": {
    id: "ign-plan_ign-sans_toponymes",
    type: "vector",
    label: "Plan sans toponymes",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-plan_ign-sans_toponymes.png",
    style: "/styles/ign/PLAN.IGN/sans_toponymes.json",
  } satisfies LayerInfos,
  "ign-plan_ign-toponymes": {
    id: "ign-plan_ign-toponymes",
    type: "vector",
    label: "Toponymes",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-plan_ign-toponymes.png",
    style: "/styles/ign/PLAN.IGN/toponymes.json",
  } satisfies LayerInfos,
  "ign-plan_ign-accentue": {
    id: "ign-plan_ign-accentue",
    type: "vector",
    label: "Plan accentué",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-plan_ign-accentue.png",
    style: "/styles/ign/PLAN.IGN/accentue.json",
  } satisfies LayerInfos,
  "ign-plan_ign-classique": {
    id: "ign-plan_ign-classique",
    type: "vector",
    label: "Plan classique",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-plan_ign-classique.png",
    style: "/styles/ign/PLAN.IGN/classique.json",
  } satisfies LayerInfos,
  "ign-plan_ign-epure": {
    id: "ign-plan_ign-epure",
    type: "vector",
    label: "Plan épuré",
    description: "",
    thumbnail: "/styles/ign/thumbnails/ign-plan_ign-epure.png",
    style: "/styles/ign/PLAN.IGN/epure.json",
  } satisfies LayerInfos,
};
