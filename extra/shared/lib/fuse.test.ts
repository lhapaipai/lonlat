import Fuse from "fuse.js";
import { describe, expect, test } from "vitest";

describe("fuse", () => {
  test("correct options", () => {
    const fuse = new Fuse(["Châtillon-sur-Cluses"], {
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 3,
    });
    expect(fuse.search("clu")).toMatchInlineSnapshot(`
      [
        {
          "item": "Châtillon-sur-Cluses",
          "matches": [
            {
              "indices": [
                [
                  0,
                  0,
                ],
                [
                  5,
                  6,
                ],
                [
                  11,
                  11,
                ],
                [
                  14,
                  16,
                ],
              ],
              "value": "Châtillon-sur-Cluses",
            },
          ],
          "refIndex": 0,
          "score": 0.14,
        },
      ]
    `);
  });
});
