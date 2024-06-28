import { describe, test, expect } from "vitest";
import { parseHashString } from ".";

describe("hash/index", () => {
  test("parseHashString", () => {
    expect(
      parseHashString(
        "#ign-raster-default_scan/15/6.50559/46.09212/3/2?search=6.5!46.1!500!type!label!1!name!context",
      ),
    ).toMatchInlineSnapshot(`
    {
      "baseLayer": "ign-raster-default_scan",
      "search": {
        "feature": {
          "geometry": {
            "coordinates": [
              6.5,
              46.1,
              500,
            ],
            "type": "Point",
          },
          "id": "6.5!46.1!500!type!label!1!name!context",
          "properties": {
            "context": "context",
            "id": "custom",
            "label": "label",
            "name": "name",
            "originalProperties": null,
            "score": 1,
            "type": "type",
          },
          "type": "Feature",
        },
        "readOnly": true,
      },
      "viewState": {
        "bearing": 3,
        "center": [
          6.50559,
          46.09212,
        ],
        "pitch": 2,
        "zoom": 15,
      },
    }
  `);
  });
});
