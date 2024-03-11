import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { lineDistance, along } from "@turf/turf";

const projectDir = dirname(fileURLToPath(new URL(".", import.meta.url)));
console.log(projectDir);

const data = await readFile(resolve(projectDir, "public/data/utm.geojson"), {
  encoding: "utf-8",
});
const geoJson = JSON.parse(data);

const distance = lineDistance(geoJson, "kilometers");

const steps = 800;
const smoothLine = [];

for (let i = 0; i < distance; i += distance / steps) {
  const point = along(geoJson, i, "kilometers");
  point.geometry.coordinates[2] = i;
  smoothLine.push(point.geometry.coordinates);
}

const checkpoints = [];
for (let i = 0; i < distance; i += 3) {
  const point = along(geoJson, i, "kilometers");
  point.properties.distance = i;
  checkpoints.push(point);
}
await writeFile(
  resolve(projectDir, "public/data/utm-checkpoints.geojson"),
  JSON.stringify({
    type: "FeatureCollection",
    features: checkpoints,
  }),
);

geoJson.geometry.coordinates = smoothLine;
await writeFile(resolve(projectDir, "public/data/utm-smooth.geojson"), JSON.stringify(geoJson));
