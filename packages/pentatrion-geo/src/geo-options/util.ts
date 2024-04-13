import { GeoOption } from "../types";

export function updateId<T extends { id: string }>(obj: T, id: string): T {
  return {
    ...obj,
    id,
  };
}

export function getTypeLabel(type?: string) {
  if (!type) return null;

  const types: { [k: string]: string } = {
    housenumber: "Point",
    street: "Rue",
    locality: "Lieu-dit",
    municipality: "Ville",
  };

  return types[type] || null;
}

export function getDepartmentName(inseeCode?: string) {
  if (!inseeCode) return null;

  const departmentNumber = inseeCode.substring(0, 2);
  const departments: { [k: string]: string } = {
    "01": "Ain",
    "02": "Aisne",
    "03": "Allier",
    "04": "Alpes-de-Haute-Provence",
    "05": "Hautes-Alpes",
    "06": "Alpes-Maritimes",
    "07": "Ardèche",
    "08": "Ardennes",
    "09": "Ariège",
    "10": "Aube",
    "11": "Aude",
    "12": "Aveyron",
    "13": "Bouches-du-Rhône",
    "14": "Calvados",
    "15": "Cantal",
    "16": "Charente",
    "17": "Charente-Maritime",
    "18": "Cher",
    "19": "Corrèze",
    "21": "Côte-d'Or",
    "22": "Côtes-d'Armor",
    "23": "Creuse",
    "24": "Dordogne",
    "25": "Doubs",
    "26": "Drôme",
    "27": "Eure",
    "28": "Eure-et-Loir",
    "29": "Finistère",
    "2A": "Corse-du-Sud",
    "2B": "Haute-Corse",
    "30": "Gard",
    "31": "Haute-Garonne",
    "32": "Gers",
    "33": "Gironde",
    "34": "Hérault",
    "35": "Ille-et-Vilaine",
    "36": "Indre",
    "37": "Indre-et-Loire",
    "38": "Isère",
    "39": "Jura",
    "40": "Landes",
    "41": "Loir-et-Cher",
    "42": "Loire",
    "43": "Haute-Loire",
    "44": "Loire-Atlantique",
    "45": "Loiret",
    "46": "Lot",
    "47": "Lot-et-Garonne",
    "48": "Lozère",
    "49": "Maine-et-Loire",
    "50": "Manche",
    "51": "Marne",
    "52": "Haute-Marne",
    "53": "Mayenne",
    "54": "Meurthe-et-Moselle",
    "55": "Meuse",
    "56": "Morbihan",
    "57": "Moselle",
    "58": "Nièvre",
    "59": "Nord",
    "60": "Oise",
    "61": "Orne",
    "62": "Pas-de-Calais",
    "63": "Puy-de-Dôme",
    "64": "Pyrénées-Atlantiques",
    "65": "Hautes-Pyrénées",
    "66": "Pyrénées-Orientales",
    "67": "Bas-Rhin",
    "68": "Haut-Rhin",
    "69": "Rhône",
    "70": "Haute-Saône",
    "71": "Saône-et-Loire",
    "72": "Sarthe",
    "73": "Savoie",
    "74": "Haute-Savoie",
    "75": "Paris",
    "76": "Seine-Maritime",
    "77": "Seine-et-Marne",
    "78": "Yvelines",
    "79": "Deux-Sèvres",
    "80": "Somme",
    "81": "Tarn",
    "82": "Tarn-et-Garonne",
    "83": "Var",
    "84": "Vaucluse",
    "85": "Vendée",
    "86": "Vienne",
    "87": "Haute-Vienne",
    "88": "Vosges",
    "89": "Yonne",
    "90": "Territoire de Belfort",
    "91": "Essonne",
    "92": "Hauts-de-Seine",
    "93": "Seine-Saint-Denis",
    "94": "Val-de-Marne",
    "95": "Val-d'Oise",
    "971": "Guadeloupe",
    "972": "Martinique",
    "973": "Guyane",
    "974": "La Réunion",
    "976": "Mayotte",
  };

  return departments[departmentNumber] || null;
}

export function convertToDms(dd: number, isLng: boolean) {
  const dir = dd < 0 ? (isLng ? "W" : "S") : isLng ? "E" : "N";

  const absDd = Math.abs(dd);
  const deg = absDd | 0;
  const frac = absDd - deg;
  const min = (frac * 60) | 0;
  let sec = frac * 3600 - min * 60;
  // Round it to 2 decimal points.
  sec = Math.round(sec * 100) / 100;
  return deg + "°" + min + "'" + sec + '"' + dir;
}

type CoordsUnit = "lonlat" | "latlon" | "dms";
export function getCoordsStr([lon, lat]: [number, number], coordsUnit: CoordsUnit) {
  switch (coordsUnit) {
    case "lonlat":
      return `${lon}, ${lat}`;
    case "latlon":
      return `${lat}, ${lon}`;
    case "dms":
      return `${convertToDms(lat, false)} ${convertToDms(lon, true)}`;
  }
}

export function stringifyGeoOption(geoFeature: GeoOption) {
  const { label, name, context, type } = geoFeature.properties;
  return JSON.stringify(
    {
      type: "Feature",
      properties: { label, name, context, type },
      geometry: geoFeature.geometry,
    },
    undefined,
    2,
  );
}
