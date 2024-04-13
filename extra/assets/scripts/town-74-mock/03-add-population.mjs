import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const inputDir = resolve(currentDir, "data");
const tmpDir = resolve(currentDir, "../../tmp/town-74-mock");

const towns = JSON.parse(readFileSync(resolve(tmpDir, "town-74-02.json")));
const populations = JSON.parse(readFileSync(resolve(inputDir, "population.json")));

const populationsByInsee = [];
populations.forEach(({ insee, population }) => {
  populationsByInsee[insee] = population;
});

let arr = [];
towns.forEach((town) => {
  if (!populationsByInsee[town.insee]) {
    console.log(town.insee);
  }
  let population = populationsByInsee[town.insee];
  arr.push({
    ...town,
    population,
    icon: population > 10000 ? "fe-town" : "fe-municipality",
  });
});

writeFileSync(resolve(tmpDir, "town-74-03.json"), JSON.stringify(arr, undefined, 2));
