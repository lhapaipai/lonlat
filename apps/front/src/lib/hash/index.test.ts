import { describe, test, expect } from "vitest";
import { parseHashString } from ".";

describe("hash/index", () => {
  test("parseHashString", () => {
    expect(
      parseHashString(
        "#ign-raster-default_scan/15/6.50559/46.09212/3/2?search=6.5!46.1!500!type!label!1!name!context",
      ),
    ).toMatchInlineSnapshot(`null`);
  });
});
