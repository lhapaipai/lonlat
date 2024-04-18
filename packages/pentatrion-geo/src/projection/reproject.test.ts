import { describe, test, expect } from "vitest";
import { epsg3857to4326 } from "./reproject";

describe("reproject", () => {
  test.each([
    [
      [0, 0],
      [0, 0],
    ],
    [
      [667916.9447596414, 5780349.220256354],
      [6, 46],
    ],
    [
      [600000, 5000000],
      [5.3898917, 40.9162745],
    ],
  ])("epsg3857to4326()", ([lon3857, lat3857], [expectedLon4326, expectedLat4326]) => {
    const [lon4326, lat4326] = epsg3857to4326([lon3857, lat3857]);
    expect(lon4326).toBeCloseTo(expectedLon4326);
    expect(lat4326).toBeCloseTo(expectedLat4326);
  });

  test("epsg3857to4326() preserve altitude", () => {
    const coords3857 = [667916.9447596414, 5780349.220256354, 4807];
    const expected4326 = [6, 46, 4807];

    const [lon4326, lat4326, altitude] = epsg3857to4326(coords3857);
    expect(lon4326).toBeCloseTo(expected4326[0]);
    expect(lat4326).toBeCloseTo(expected4326[1]);
    expect(altitude).toBeCloseTo(expected4326[2]);
  });
});
