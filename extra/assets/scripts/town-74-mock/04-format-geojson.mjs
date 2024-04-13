import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const tmpDir = resolve(currentDir, "../../tmp/town-74-mock");
const distDir = resolve(currentDir, "dist");

const content = JSON.parse(readFileSync(resolve(tmpDir, "town-74-03.json")));

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

writeFileSync(resolve(distDir, "town-74.geojson"), JSON.stringify(collection, undefined, 2));
