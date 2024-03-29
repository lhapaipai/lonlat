import { Feature } from "geojson";
import { StyleSpecification } from "maplibre-gl";

//
export const styleBase: StyleSpecification = {
  version: 8,
  name: "PLAN IGN",
  // glyphs: "https://data.geopf.fr/annexes/ressources/vectorTiles/fonts/{fontstack}/{range}.pbf",
  // sprite: "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/sprite/PlanIgn",
  sources: {
    plan_ign: {
      type: "vector",
      tiles: ["https://data.geopf.fr/tms/1.0.0/PLAN.IGN/{z}/{x}/{y}.pbf"],
    },
  },
  transition: {
    duration: 300,
    delay: 0,
  },
  layers: [
    {
      id: "ocs - vegetation - zone boiséee, foret fermee, peupleraie",
      type: "fill",
      source: "plan_ign",
      "source-layer": "ocs_vegetation_surf",
      layout: {
        visibility: "visible",
      },
      filter: [
        "in",
        "symbo",
        "ZONE_BOISEE",
        "ZONE_FORET_FERMEE_FEUIL",
        "ZONE_FORET_FERMEE_CONI",
        "ZONE_FORET_FERMEE_MIXTE",
        "ZONE_PEUPLERAIE",
      ],
      paint: {
        "fill-color": "#DFE8D5",
        "fill-outline-color": "#DFE8D5",
      },
    },
  ],
};

export const utm: Feature = {
  type: "Feature",
  properties: {
    traceID: "108296",
    nom: "Ultra Tour du Môle 2020 - 35 km (fichier style.ts)",
  },
  geometry: {
    type: "LineString",
    coordinates: [
      [6.500239938608518, 46.09073992765464, 473],
      [6.499883307440721, 46.09065956084569, 472],
      [6.499439539690367, 46.09055988091994, 472],
    ],
  },
};
