import { describe, expect, test } from "vitest";
import { simplify } from "./simplify";
describe("simplify", () => {
  test("return first argument when first argument lenth is less than or equal 2", () => {
    expect(simplify([{ x: 1, y: 2 }])).toMatchInlineSnapshot(`
      [
        {
          "x": 1,
          "y": 2,
        },
      ]
    `);
    expect(
      simplify([
        { x: 1, y: 2 },
        { x: 3, y: 3 },
      ]),
    ).toMatchInlineSnapshot(`
      [
        {
          "x": 1,
          "y": 2,
        },
        {
          "x": 3,
          "y": 3,
        },
      ]
    `);
    expect(simplify([])).toMatchInlineSnapshot(`[]`);
  });

  test("return value is an array of filtered elements that are part of the original set", () => {
    const points = Array.from({ length: 30 }).map(() => ({
      x: Math.round(Math.random() * 1000) - 500,
      y: Math.round(Math.random() * 1000) - 500,
    }));

    const result = simplify(points, 300);
    result.map((p) => {
      expect(points.includes(p)).toBe(true);
    });
  });

  test("behavior with unusual values", () => {
    const points = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
      { x: 5, y: 1 },
    ];
    expect(simplify(points, 0.00000001)).toMatchInlineSnapshot(`
      [
        {
          "x": 1,
          "y": 2,
        },
        {
          "x": 3,
          "y": 4,
        },
        {
          "x": 5,
          "y": 1,
        },
      ]
    `);
    expect(simplify(points, 1000000000)).toMatchInlineSnapshot(`
      [
        {
          "x": 1,
          "y": 2,
        },
        {
          "x": 5,
          "y": 1,
        },
      ]
    `);
  });
  // test("performance set", () => {
  //   const start = Date.now();
  //   const points = Array.from({ length: 1000000 }).map(() => ({
  //     x: Math.round(Math.random() * 1000) - 500,
  //     y: Math.round(Math.random() * 1000) - 500,
  //   }));

  //   const result = simplify(points, 300);
  //   const millis = Date.now() - start;
  //   console.log("TIME", millis);
  //   expect(result.length).toBe(2);
  // });
});
