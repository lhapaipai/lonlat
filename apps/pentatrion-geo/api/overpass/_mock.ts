import { APISchemas } from "./api";

export const poiResponse: APISchemas["InterpreterResponse"] = {
  version: 0.6,
  generator: "Overpass API 0.7.62.1 084b4234",
  osm3s: {
    timestamp_osm_base: "2024-07-02T12:13:02Z",
    copyright:
      "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.",
  },
  elements: [
    {
      type: "node",
      id: 26695137,
      lat: 46.1386318,
      lon: 6.4582302,
      tags: {
        "addr:postcode": "74490",
        alt_name: "Saint-Jeoire-en-Faucigny",
        name: "Saint-Jeoire",
        "name:frp": "San Zhouro",
        place: "village",
        wikidata: "Q769321",
        wikipedia: "fr:Saint-Jeoire",
      },
    },
    {
      type: "node",
      id: 26697498,
      lat: 46.0903808,
      lon: 6.4992902,
      tags: {
        "addr:postcode": "74970",
        "alt_name:frp": "Mâregniér",
        name: "Marignier",
        "name:frp": "Mârni",
        place: "village",
        wikidata: "Q225606",
        wikipedia: "fr:Marignier",
      },
    },
    {
      type: "node",
      id: 339292568,
      lat: 46.134722,
      lon: 6.523333,
      tags: {
        "addr:postcode": "74440",
        "alt_name:frp": "Miôci;Miœci",
        name: "Mieussy",
        "name:frp": "Myeûfi",
        place: "village",
        wikidata: "Q672956",
        wikipedia: "fr:Mieussy",
      },
    },
    {
      type: "node",
      id: 6022119668,
      lat: 46.1065823,
      lon: 6.4548201,
      tags: {
        ele: "1863",
        name: "Le Môle",
        natural: "peak",
        "summit:cross": "yes",
        wikidata: "Q3224959",
        wikimedia_commons: "Category:Le Môle",
        wikipedia: "fr:Le Môle",
      },
    },
    {
      type: "node",
      id: 9388423648,
      lat: 46.1368354,
      lon: 6.4713845,
      tags: {
        ele: "614",
        name: "Château Vieux",
        natural: "peak",
        source: "IGN - 2021-09",
      },
    },
  ],
};
