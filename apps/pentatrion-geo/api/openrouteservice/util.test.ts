import { lineString } from "@turf/helpers";
import { describe, expect, test } from "vitest";
import { computeDistance } from "./util";

describe("util", () => {
  test("compute Distance", () => {
    const lineGeomWithoutElevation = lineString([
      [6, 45],
      [7, 45],
      [7, 46],
    ]).geometry;

    // keep elevation undefined
    expect(computeDistance(lineGeomWithoutElevation)).toMatchInlineSnapshot(`
      {
        "coordinates": [
          [
            6,
            45,
            undefined,
            0,
          ],
          [
            7,
            45,
            undefined,
            78.62629627999046,
          ],
          [
            7,
            46,
            undefined,
            189.82137651352338,
          ],
        ],
        "type": "LineString",
      }
    `);

    const lineGeomWithElevation = lineString([
      [6, 45, 400],
      [7, 45, 500],
      [7, 46, 600],
    ]).geometry;

    expect(computeDistance(lineGeomWithElevation)).toMatchInlineSnapshot(`
      {
        "coordinates": [
          [
            6,
            45,
            400,
            0,
          ],
          [
            7,
            45,
            500,
            78.62629627999046,
          ],
          [
            7,
            46,
            600,
            189.82137651352338,
          ],
        ],
        "type": "LineString",
      }
    `);

    const lineGeomWithExtra = lineString([
      [6, 45, 400],
      [7, 45, 500],
      [7, 46, 600],
    ]).geometry;

    // @ts-expect-error
    lineGeomWithExtra.foo = "bar";
    expect(computeDistance(lineGeomWithExtra)).toMatchInlineSnapshot(`
      {
        "coordinates": [
          [
            6,
            45,
            400,
            0,
          ],
          [
            7,
            45,
            500,
            78.62629627999046,
          ],
          [
            7,
            46,
            600,
            189.82137651352338,
          ],
        ],
        "foo": "bar",
        "type": "LineString",
      }
    `);
  });
});
