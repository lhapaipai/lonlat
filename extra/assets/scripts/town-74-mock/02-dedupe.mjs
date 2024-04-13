import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const tmpDir = resolve(currentDir, "../../tmp/town-74-mock");

const content = JSON.parse(readFileSync(resolve(tmpDir, "town-74-01.json")));

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
writeFileSync(resolve(tmpDir, "town-74-02.json"), JSON.stringify(arr, undefined, 2));
