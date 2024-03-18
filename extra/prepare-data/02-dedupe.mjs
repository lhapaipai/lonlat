import { readFileSync, writeFileSync } from "node:fs";

const content = JSON.parse(readFileSync("town-74-01.json"));
console.log(content);
let arr = [];
let insees = new Set();
content.forEach((town) => {
  if (insees.has(town.insee)) {
    return;
  }

  arr.push(town);
  insees.add(town.insee);
});

console.log(content.length, arr.length);
writeFileSync("town-74-02.json", JSON.stringify(arr, undefined, 2));
