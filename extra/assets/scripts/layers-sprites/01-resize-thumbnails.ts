import { fileURLToPath } from "node:url";
import { dirname, parse, resolve } from "node:path";
import { mkdir, readdir } from "node:fs/promises";
import sharp from "sharp";
import { imgHeight, imgWidth } from "./config.ts";
import { existsSync } from "node:fs";

const currentDir = dirname(fileURLToPath(import.meta.url));
const inputDir = resolve(currentDir, "data");
const tmpDir = resolve(currentDir, "../../tmp");

const files = await readdir(inputDir);

for (const multiplier of [1, 2]) {
  const tmpSubDir = resolve(tmpDir, `layer-thumbnails-${multiplier}x`);
  if (!existsSync(tmpSubDir)) {
    await mkdir(tmpSubDir);
  }

  for (const base of files) {
    const name = parse(base).name;
    const outputPath = resolve(tmpSubDir, `${name}.png`);
    await sharp(resolve(inputDir, base))
      .resize(imgWidth * multiplier, imgHeight * multiplier, {
        fit: "cover",
      })
      .png()
      .toFile(outputPath);

    console.log(outputPath);
  }
}
