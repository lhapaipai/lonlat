import { describe, test, expect } from "vitest";
import {
  basicRegex,
  latlonDdmRegex,
  latlonDmsRegex,
  latlonRegex,
  lonlatDdmRegex,
  lonlatDmsRegex,
  lonlatRegex,
} from "./coordsSearch";

describe("coordsSearch", () => {
  test.each([
    ["5, 45", ["5", "45"]],
    ["-5, -45", ["-5", "-45"]],
    ["5 ; 45", ["5", "45"]],
    ["5  45", ["5", "45"]],
    ["  5, 45   ", ["5", "45"]],
    ["5.2, 45.354", ["5.2", "45.354"]],
  ])('basicRegex with "%s"', (searchValue, expectedResult) => {
    const match = basicRegex.exec(searchValue);
    if (match === null) {
      expect(expectedResult).toBeNull();
    } else {
      expect(match[1]).toBe(expectedResult[0]);
      expect(match[2]).toBe(expectedResult[1]);
    }
  });

  test.each([
    ["longitude: 5, latitude: 45", ["5", "45"]],
    ["lon: 5, lat: 45", ["5", "45"]],
    ["lng: 5, lat: 45", ["5", "45"]],
    ["  lon :   5  , lat  :   45   ", ["5", "45"]],
    ["  lon :   5  ; lat  :   45   ", ["5", "45"]],
    ["  lon :   5    lat  :   45   ", ["5", "45"]],
  ])('lonlatRegex with "%s"', (searchValue, expectedResult) => {
    const match = lonlatRegex.exec(searchValue);
    if (match === null) {
      expect(expectedResult).toBeNull();
    } else {
      expect(match[1]).toBe(expectedResult[0]);
      expect(match[2]).toBe(expectedResult[1]);
    }
  });

  test.each([
    ["latitude: 5, longitude: 45", ["5", "45"]],
    ["lat: 5, lon: 45", ["5", "45"]],
    ["lat: 5, lng: 45", ["5", "45"]],
    ["  lat :   5  , lon  :   45   ", ["5", "45"]],
    ["  lat :   5  ; lon  :   45   ", ["5", "45"]],
    ["  lat :   5    lon  :   45   ", ["5", "45"]],
  ])('lonlatRegex with "%s"', (searchValue, expectedResult) => {
    const match = latlonRegex.exec(searchValue);
    if (match === null) {
      expect(expectedResult).toBeNull();
    } else {
      expect(match[1]).toBe(expectedResult[0]);
      expect(match[2]).toBe(expectedResult[1]);
    }
  });

  test.each([
    ["40° 26' 45\" N, 79° 58' 55\" E", ["40", "26", "45", "N", "79", "58", "55", "E"]],
    ["40° 26′ 45″ N, 79° 58′ 55″ E", ["40", "26", "45", "N", "79", "58", "55", "E"]],
    [
      "  40  °  26 '  45 \" N , 79  °  58 '  55  \"   E  ",
      ["40", "26", "45", "N", "79", "58", "55", "E"],
    ],
    ["40°26'45\"N,79°58'55\"E", ["40", "26", "45", "N", "79", "58", "55", "E"]],
    ["40° 26' 45\" n, 79° 58' 55\" e", ["40", "26", "45", "n", "79", "58", "55", "e"]],
    ["40° 26' 45\" s, 79° 58' 55\" w", ["40", "26", "45", "s", "79", "58", "55", "w"]],
    ["40° 26' 45\" s, 79° 58' 55\" o", ["40", "26", "45", "s", "79", "58", "55", "o"]],
  ])('lonlatDmsRegex with "%s"', (searchValue, expectedResult) => {
    const match = lonlatDmsRegex.exec(searchValue);
    if (match === null) {
      expect(expectedResult).toBeNull();
    } else {
      expect(match[1]).toBe(expectedResult[0]);
      expect(match[2]).toBe(expectedResult[1]);
      expect(match[3]).toBe(expectedResult[2]);
      expect(match[4]).toBe(expectedResult[3]);
      expect(match[5]).toBe(expectedResult[4]);
      expect(match[6]).toBe(expectedResult[5]);
      expect(match[7]).toBe(expectedResult[6]);
      expect(match[8]).toBe(expectedResult[7]);
    }
  });

  test.each([["40° 26' 45\" E, 79° 58' 55\" N", ["40", "26", "45", "E", "79", "58", "55", "N"]]])(
    'latlonDmsRegex with "%s"',
    (searchValue, expectedResult) => {
      const match = latlonDmsRegex.exec(searchValue);
      if (match === null) {
        expect(expectedResult).toBeNull();
      } else {
        expect(match[1]).toBe(expectedResult[0]);
        expect(match[2]).toBe(expectedResult[1]);
        expect(match[3]).toBe(expectedResult[2]);
        expect(match[4]).toBe(expectedResult[3]);
        expect(match[5]).toBe(expectedResult[4]);
        expect(match[6]).toBe(expectedResult[5]);
        expect(match[7]).toBe(expectedResult[6]);
        expect(match[8]).toBe(expectedResult[7]);
      }
    },
  );

  test.each([
    ["40° 26' N, 79° 58' E", ["40", "26", "N", "79", "58", "E"]],
    ["40° 26.48' N, 79° 58.78' E", ["40", "26.48", "N", "79", "58.78", "E"]],
    ["  40  ° 26  '  N  ,  79  °  58  '  E  ", ["40", "26", "N", "79", "58", "E"]],
    ["40°26'N,79°58'E", ["40", "26", "N", "79", "58", "E"]],
  ])('lonlatDdmRegex with "%s"', (searchValue, expectedResult) => {
    const match = lonlatDdmRegex.exec(searchValue);
    if (match === null) {
      expect(expectedResult).toBeNull();
    } else {
      expect(match[1]).toBe(expectedResult[0]);
      expect(match[2]).toBe(expectedResult[1]);
      expect(match[3]).toBe(expectedResult[2]);
      expect(match[4]).toBe(expectedResult[3]);
      expect(match[5]).toBe(expectedResult[4]);
      expect(match[6]).toBe(expectedResult[5]);
    }
  });

  test.each([["40° 26.3' E, 79° 58.45' N", ["40", "26.3", "E", "79", "58.45", "N"]]])(
    'latlonDdmRegex with "%s"',
    (searchValue, expectedResult) => {
      const match = latlonDdmRegex.exec(searchValue);
      if (match === null) {
        expect(expectedResult).toBeNull();
      } else {
        expect(match[1]).toBe(expectedResult[0]);
        expect(match[2]).toBe(expectedResult[1]);
        expect(match[3]).toBe(expectedResult[2]);
        expect(match[4]).toBe(expectedResult[3]);
        expect(match[5]).toBe(expectedResult[4]);
        expect(match[6]).toBe(expectedResult[5]);
      }
    },
  );
});
