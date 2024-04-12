import { fileURLToPath } from "node:url";
import { dirname, parse, resolve } from "node:path";
import { readdir } from "node:fs/promises";
import sharp from "sharp";
import { imgHeight, imgWidth } from "./config.ts";

const projectDir = dirname(fileURLToPath(import.meta.url));
const inputDir = resolve(projectDir, "data/layer-thumbnails");
const distDir = resolve(projectDir, "dist");

const files = await readdir(inputDir);

for (const multiplier of [1, 2]) {
  for (const base of files) {
    const name = parse(base).name;
    const outputPath = resolve(distDir, `layer-thumbnails-${multiplier}x/${name}.png`);
    await sharp(resolve(inputDir, base))
      .resize(imgWidth * multiplier, imgHeight * multiplier, {
        fit: "cover",
      })
      .png()
      .toFile(outputPath);

    console.log(outputPath);
  }
}
