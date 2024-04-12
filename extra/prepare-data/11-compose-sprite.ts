import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp, { OverlayOptions } from "sharp";
import { imgHeight, imgWidth } from "./config.ts";
import { writeFile } from "node:fs/promises";

const projectDir = dirname(fileURLToPath(import.meta.url));

const distDir = resolve(projectDir, "dist");

const layersBySpriteName = {
  layers: [
    /* base */
    "ign-raster-default_scan",
    "ign-raster-scan_25",
    "ign-raster-orthophoto",
    "ign-plan_ign-standard",
    "swisstopo-raster-orthophoto",
    "swisstopo-raster-default",
    "swisstopo-raster-default_25",
    "osm-raster-default",
    "google-raster-orthophoto",
    "maptiler-streets",

    /* optionals */
    "terrain",
    "ign-admin_express-adminexpress",
    "ign-plan_ign-toponymes",
    "ign-pci-pci",
    "ign-isohypse-isohypse_monochrome_marron",
    "hillshade",
    "street-view",

    "unknown",
  ],
  "all-layers": [
    /* hard coded to keep same position for previous layers if new thumbnails are added */
    "etalab-osm_bright",
    "google-raster-orthophoto",
    "google-raster-relief",
    "google-raster-road",
    "google-raster-street_view",
    "hillshade",
    "ign-admin_express-adminexpress",
    "ign-bd_topo-bati",
    "ign-bd_topo-bati_date",
    "ign-bd_topo-bati_etages",
    "ign-bd_topo-classique",
    "ign-bd_topo-hydrographie",
    "ign-bd_topo-routier",
    "ign-isohypse-isohypse_monochrome_marron",
    "ign-isohypse-isohypse_monochrome_orange",
    "ign-isohypse-isohypse_multicolore",
    "ign-pci-noir_et_blanc",
    "ign-pci-pci",
    "ign-plan_ign-accentue",
    "ign-plan_ign-attenue",
    "ign-plan_ign-classique",
    "ign-plan_ign-epure",
    "ign-plan_ign-gris",
    "ign-plan_ign-sans_toponymes",
    "ign-plan_ign-standard",
    "ign-plan_ign-toponymes",
    "ign-raster-cadastre",
    "ign-raster-default_scan",
    "ign-raster-express",
    "ign-raster-orthophoto",
    "ign-raster-scan_25",
    "ign-raster-streets",
    "maptiler-streets",
    "osm-raster-default",
    "street-view",
    "swisstopo-raster-default",
    "swisstopo-raster-default_25",
    "swisstopo-raster-orthophoto",
    "terrain",
    "terrarium",
    "unknown",
  ],
};

type ManifestMultiplierEntries = {
  [layerId: string]: [number, number];
};

const manifest: {
  [multiplier: string]: ManifestMultiplierEntries;
} = {};

for (const spriteName in layersBySpriteName) {
  // @ts-ignore
  const layers = layersBySpriteName[spriteName] as string[];

  for (const multiplier of [1, 2]) {
    manifest[`${multiplier}x`] = {};

    const sprite = await sharp({
      create: {
        width: imgWidth * multiplier,
        height: layers.length * imgHeight * multiplier,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    });

    const compositeOptions: OverlayOptions[] = [];
    for (const [key, layerName] of Object.entries(layers)) {
      const idx: number = +key;
      compositeOptions.push({
        input: resolve(distDir, `layer-thumbnails-${multiplier}x/${layerName}.png`),
        top: idx * imgHeight * multiplier,
        left: 0,
      });

      manifest[`${multiplier}x`][layerName] = [0, -idx * imgHeight * multiplier];
    }

    const outputPath = resolve(distDir, `sprites/${spriteName}-${multiplier}x.jpg`);

    await sprite
      .composite(compositeOptions)
      .jpeg({
        quality: 85,
      })
      .toFile(outputPath);
  }

  await writeFile(
    resolve(distDir, `sprites/${spriteName}-manifest.json`),
    JSON.stringify(manifest, undefined, 2),
    {
      encoding: "utf-8",
    },
  );
}
