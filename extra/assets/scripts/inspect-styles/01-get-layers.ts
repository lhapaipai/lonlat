import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { StyleSpecification } from "@maplibre/maplibre-gl-style-spec";

const projectDir = dirname(fileURLToPath(import.meta.url));
const styleDir = resolve(projectDir, "../../public/styles-original/ign/PLAN.IGN");
const styleText = await readFile(resolve(styleDir, "standard.json"), { encoding: "utf-8" });

const style = JSON.parse(styleText) as StyleSpecification;

const layers = style.layers.map((layer) => layer.id);

console.log(layers);
await writeFile(resolve(projectDir, "dist/manifest"), JSON.stringify(layers, undefined, 2));
