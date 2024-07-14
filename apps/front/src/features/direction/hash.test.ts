import { describe, expect, test } from "vitest";
import { parseDirection, stringifyDirection } from "./hash";
import { createFakeFeature } from "./_mocks";

describe("hash.direction", () => {
  test("stringifyDirection", () => {
    expect(
      stringifyDirection({
        showElevationProfile: true,
        pois: null,
        focusCoordinates: null,
        wayPoints: [createFakeFeature({}), createFakeFeature({})],
        constraints: {
          avoidBorders: false,
          avoidHighways: false,
          avoidTollways: false,
        },
        optimization: "recommended",
        profile: "car",
        route: null,
      }),
    ).toMatchInlineSnapshot(
      `"car|recommended|0|0|0|1|5_45!type!label^5_45!type!label"`,
    );
  });
  test("parseSearch", () => {
    expect(
      parseDirection("car|recommended|0|0|0|1|5_45!type!label^5_45!type!label"),
    ).toMatchInlineSnapshot(`
      {
        "constraints": {
          "avoidBorders": false,
          "avoidHighways": false,
          "avoidTollways": false,
        },
        "focusCoordinates": null,
        "optimization": "recommended",
        "pois": null,
        "profile": "car",
        "route": null,
        "showElevationProfile": true,
        "wayPoints": [
          {
            "geometry": {
              "coordinates": [
                5,
                45,
              ],
              "type": "Point",
            },
            "id": "5_45!type!label",
            "properties": {
              "context": "",
              "id": "custom",
              "label": "label",
              "name": "",
              "originalProperties": null,
              "score": 1,
              "type": "type",
            },
            "type": "Feature",
          },
          {
            "geometry": {
              "coordinates": [
                5,
                45,
              ],
              "type": "Point",
            },
            "id": "5_45!type!label",
            "properties": {
              "context": "",
              "id": "custom",
              "label": "label",
              "name": "",
              "originalProperties": null,
              "score": 1,
              "type": "type",
            },
            "type": "Feature",
          },
        ],
      }
    `);

    expect(parseDirection("bike@nothing--error")).toMatchInlineSnapshot(`null`);
  });
});
