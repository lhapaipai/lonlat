import { readFileSync, writeFileSync } from "node:fs";

const content = JSON.parse(readFileSync("town-74-original.json"));
console.log(content);
let arr = [];
content.forEach((town) => {
  arr.push({
    ...town,
    context: `${town.nom_commune}, ${town.nom_departement}, ${town.nom_region}`,
  });
});

console.log(content.length, arr.length);
writeFileSync("town-74-01.json", JSON.stringify(arr));
