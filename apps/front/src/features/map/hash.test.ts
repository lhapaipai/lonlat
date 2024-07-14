import { describe, test, expect } from "vitest";
import { parseMapHash, stringifyMap } from "./hash";

describe("hash.map", () => {
  test("stringifyMap", () => {
    expect(
      stringifyMap({
        baseLayer: "ign-raster-default_scan",
        optionalLayers: [],
        streetView: false,
        terrain: false,
        viewState: {
          bearing: 0,
          center: [6.51769, 46.08211],
          pitch: 0,
          zoom: 12.39,
        },
      }),
    ).toMatchInlineSnapshot(`"ign-raster-default_scan/12.39/6.51769/46.08211"`);

    expect(
      stringifyMap({
        baseLayer: "ign-raster-default_scan",
        optionalLayers: ["ign-plan_ign-toponymes"],
        streetView: true,
        terrain: true,
        viewState: {
          bearing: 5.43,
          center: [6.517691234, 46.082111234],
          pitch: 10.34,
          zoom: 12.39,
        },
      }),
    ).toMatchInlineSnapshot(
      `"ign-raster-default_scan/12.39/6.51769/46.08211/5.4/10.3/ign-plan_ign-toponymes|terrain"`,
    );
  });

  test("parseMapHash", () => {
    expect(parseMapHash("/ign-raster-default_scan/12.39/6.51769/46.08211"))
      .toMatchInlineSnapshot(`
      {
        "baseLayer": "ign-raster-default_scan",
        "optionalLayers": [],
        "streetView": false,
        "terrain": false,
        "viewState": {
          "bearing": 0,
          "center": [
            6.51769,
            46.08211,
          ],
          "pitch": 0,
          "zoom": 12.39,
        },
      }
    `);

    expect(
      parseMapHash(
        "/ign-raster-default_scan/12.39/6.51769/46.08211/5/10/foo|ign-plan_ign-toponymes|terrain|street-view",
      ),
    ).toMatchInlineSnapshot(`
      {
        "baseLayer": "ign-raster-default_scan",
        "optionalLayers": [
          "ign-plan_ign-toponymes",
        ],
        "streetView": false,
        "terrain": true,
        "viewState": {
          "bearing": 5,
          "center": [
            6.51769,
            46.08211,
          ],
          "pitch": 10,
          "zoom": 12.39,
        },
      }
    `);
  });
});
