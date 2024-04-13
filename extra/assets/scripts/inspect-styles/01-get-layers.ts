import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));
const styleDir = resolve(projectDir, "../../public/styles-original/ign/PLAN.IGN");
const styleText = await readFile(resolve(styleDir, "standard.json"));

const style = JSON.parse(styleText);

const layers = style.layers.map((layer) => layer.id);

console.log(layers);
await writeFile(resolve(projectDir, "dist/manifest"), JSON.stringify(layers, undefined, 2));
