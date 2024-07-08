import { describe, expect, test } from "vitest";
import { lineString } from "./helpers";
import { point } from "@turf/helpers";
import { nearestPointOnLine } from "@turf/nearest-point-on-line";
describe("helpers", () => {
  /**
   * As we are using incomplete linestrings it is important to see the
   * result caused by these objects to see if further testing is needed.
   */
  test("nearestPointOnLine with incomplete lineString", () => {
    const pointFeature = point([5, 6]);

    const lineFeature1 = lineString([]);
    const result1 = nearestPointOnLine(lineFeature1, pointFeature);
    expect(result1).toMatchInlineSnapshot(`
      {
        "geometry": {
          "coordinates": [
            Infinity,
            Infinity,
          ],
          "type": "Point",
        },
        "properties": {
          "dist": Infinity,
          "index": -1,
          "location": -1,
        },
        "type": "Feature",
      }
    `);

    const lineFeature2 = lineString([[3, 4]]);
    const result2 = nearestPointOnLine(lineFeature2, pointFeature);
    expect(result2).toMatchInlineSnapshot(`
      {
        "geometry": {
          "coordinates": [
            Infinity,
            Infinity,
          ],
          "type": "Point",
        },
        "properties": {
          "dist": Infinity,
          "index": -1,
          "location": -1,
        },
        "type": "Feature",
      }
    `);

    const lineFeature3 = lineString([
      [3, 4],
      [7, 11],
    ]);
    const result3 = nearestPointOnLine(lineFeature3, pointFeature);
    expect(result3).toMatchInlineSnapshot(`
      {
        "geometry": {
          "coordinates": [
            4.335564984385168,
            6.337238722674043,
          ],
          "type": "Point",
        },
        "properties": {
          "dist": 82.47234889841872,
          "index": 0,
          "location": 299.02361371293665,
        },
        "type": "Feature",
      }
    `);
  });
});
