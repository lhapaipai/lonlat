import { describe, expect, test } from "vitest";
import { deepEqual } from "./util";

describe("util", () => {
  test.each([
    [0, 0, true],
    [0, 1, false],
    [1, 1, true],
    [1, 2, false],
    [false, false, true],
    [false, true, false],
    ["", "", true],
    ["false", "false", true],
    ["hello", "world", false],
    [1.2, 1.2, true],
    [[], [], true],
    [[1], [1], true],
    [[1], [2], false],
    [{}, {}, true],
    [{}, true, false],
    [{ foo: "foo" }, { foo: "foo" }, true],
    [{ foo: "foo" }, { bar: "bar" }, false],
    [{ foo: "foo" }, { foo: "foo", bar: "bar" }, false],
    [{ foo: "foo", bar: "bar" }, { foo: "foo" }, false],
  ])("deepEqual", (a, b, expectedResult) => {
    expect(deepEqual(a, b)).toEqual(expectedResult);
  });
});
