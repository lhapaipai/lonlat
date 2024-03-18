import { readFileSync, writeFileSync } from "node:fs";

const towns = JSON.parse(readFileSync("town-74-original.json"));
const populations = JSON.parse(readFileSync("population.json"));
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
    context: `${town.nom_commune}, ${town.nom_departement}, ${town.nom_region}`,
    population,
    icon: population > 10000 ? "fe-town" : "fe-municipality",
  });
});

writeFileSync("town-74.json", JSON.stringify(arr));
