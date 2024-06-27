import { describe, test, expect } from "vitest";
import {
  parseHashString,
  parseSearchString,
  stringifySearch,
} from "./hashUtil";
import { SearchFeature } from "~/features/search/searchSlice";

function createFakeFeature({
  lng = 5,
  lat = 45,
  z = 400,
  label = "label",
  name = "name",
  context = "context",
  type = "type",
} = {}): SearchFeature {
  return {
    id: "fake",
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat, z],
    },
    properties: { id: "fake", score: 1, label, name, context, type },
  };
}

describe("hashUtil", () => {
  test("foo", () => {
    expect(true).toBe(true);
  });
  test("stringifySearch", () => {
    expect(
      stringifySearch({
        feature: createFakeFeature(),
        readOnly: true,
      }),
    ).toMatchInlineSnapshot(`"5!45!400!type!label!1"`);
    expect(
      stringifySearch({
        feature: createFakeFeature(),
        readOnly: false,
      }),
    ).toMatchInlineSnapshot(`"5!45!400!type!label!0"`);
    expect(
      stringifySearch({
        feature: null,
        readOnly: false,
      }),
    ).toMatchInlineSnapshot(`null`);
    expect(
      stringifySearch(
        {
          feature: createFakeFeature({
            name: "with space",
            context: "spélà@chars",
            type: "with!d!e!l!i!m!i!t!e!r",
          }),
          readOnly: false,
        },
        false,
      ),
    ).toMatchInlineSnapshot(
      `"5!45!400!withdelimiter!label!0!with%20space!sp%C3%A9l%C3%A0@chars"`,
    );
  });
  test("parseSearchString", () => {
    expect(parseSearchString("5!45!400!type!label!1!name!context"))
      .toMatchInlineSnapshot(`
        {
          "feature": {
            "geometry": {
              "coordinates": [
                5,
                45,
                400,
              ],
              "type": "Point",
            },
            "id": "5!45!400!type!label!1!name!context",
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
        }
      `);
    expect(parseSearchString("")).toMatchInlineSnapshot(`
      {
        "feature": null,
        "readOnly": false,
      }
    `);
    expect(parseSearchString("5!not-a-number!400!type!label!1!name!context"))
      .toMatchInlineSnapshot(`
      {
        "feature": null,
        "readOnly": false,
      }
    `);
    // need at least a label
    expect(parseSearchString("5!45!400")).toMatchInlineSnapshot(`
      {
        "feature": null,
        "readOnly": false,
      }
    `);
    expect(parseSearchString("5!45!400!type!label")).toMatchInlineSnapshot(`
      {
        "feature": {
          "geometry": {
            "coordinates": [
              5,
              45,
              400,
            ],
            "type": "Point",
          },
          "id": "5!45!400!type!label",
          "properties": {
            "context": "undefined",
            "id": "custom",
            "label": "label",
            "name": "undefined",
            "originalProperties": null,
            "score": 1,
            "type": "type",
          },
          "type": "Feature",
        },
        "readOnly": false,
      }
    `);
    expect(
      parseSearchString(
        "5!45!400!withdelimiter!label!0!with%20space!sp%C3%A9l%C3%A0@chars!0",
      ),
    ).toMatchInlineSnapshot(`
      {
        "feature": {
          "geometry": {
            "coordinates": [
              5,
              45,
              400,
            ],
            "type": "Point",
          },
          "id": "5!45!400!withdelimiter!label!0!with%20space!sp%C3%A9l%C3%A0@chars!0",
          "properties": {
            "context": "spélà@chars",
            "id": "custom",
            "label": "label",
            "name": "with space",
            "originalProperties": null,
            "score": 1,
            "type": "withdelimiter",
          },
          "type": "Feature",
        },
        "readOnly": true,
      }
    `);
  });
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
