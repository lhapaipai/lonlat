import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const inputDir = resolve(currentDir, "data");
const tmpDir = resolve(currentDir, "../../tmp/town-74-mock");

if (!existsSync(tmpDir)) {
  await mkdir(tmpDir);
}

const content = JSON.parse(readFileSync(resolve(inputDir, "town-74.json")));

let arr = [];
content.forEach((town) => {
  arr.push({
    ...town,
    context: `${town.nom_commune}, ${town.nom_departement}, ${town.nom_region}`,
  });
});

console.log(content.length, arr.length);
writeFileSync(resolve(tmpDir, "town-74-01.json"), JSON.stringify(arr));
