import { readFileSync, writeFileSync } from "node:fs";

const content = JSON.parse(readFileSync("town-74-02.json"));

const collection = {
  type: "FeatureCollection",
  features: content.map((properties) => {
    return {
      id: properties.insee.toString(),
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [properties.longitude, properties.latitude],
      },
      properties: {
        id: properties.insee.toString(),
        name: properties.nom_commune,
        context: properties.nom_departement,
        label: `${properties.nom_commune}, ${properties.nom_departement}`,
        score: 1,
        type: "municipality",
        originalProperties: properties,
      },
    };
  }),
};
writeFileSync("town-74.geojson", JSON.stringify(collection, undefined, 2));
