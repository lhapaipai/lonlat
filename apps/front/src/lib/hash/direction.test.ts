import { describe, expect, test } from "vitest";
import { parseDirection, stringifyDirection } from "./direction";
import { createFakeFeature } from "./_mocks";

describe("hash.direction", () => {
  test("stringifyDirection", () => {
    expect(
      stringifyDirection({
        elevationChart: false,
        pois: [],
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
      `"car|recommended|0|0|0|5_45!type!label^5_45!type!label"`,
    );
  });
  test("parseSearch", () => {
    expect(
      parseDirection(
        "bike|shortest|1|1|0|5_45!type!label^nodata^error^5_45!type!label",
      ),
    ).toMatchInlineSnapshot(`
      {
        "constraints": {
          "avoidBorders": false,
          "avoidHighways": true,
          "avoidTollways": true,
        },
        "elevationChart": true,
        "focusCoordinates": null,
        "optimization": "shortest",
        "pois": null,
        "profile": "bike",
        "route": null,
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
            "id": "1",
            "type": "nodata",
          },
          {
            "id": "2",
            "type": "nodata",
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
