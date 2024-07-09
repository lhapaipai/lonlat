import { describe, test, expect } from "vitest";
import { parseSearch, stringifySearch } from "./search";
import { createFakeFeature } from "./_mocks";

describe("hashUtil", () => {
  test("stringifySearch", () => {
    expect(
      stringifySearch({
        feature: createFakeFeature({}),
      }),
    ).toMatchInlineSnapshot(`"5_45!type!label"`);
    expect(
      stringifySearch({
        feature: createFakeFeature({ z: 3 }),
      }),
    ).toMatchInlineSnapshot(`"5_45_3!type!label"`);
    expect(
      stringifySearch({
        feature: null,
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
        },
        false,
      ),
    ).toMatchInlineSnapshot(
      `"5_45!withdelimiter!label!with%20space!sp%C3%A9l%C3%A0@chars"`,
    );
  });
  test("parseSearch", () => {
    expect(
      parseSearch("5!45!400!type!label!1!name!context"),
    ).toMatchInlineSnapshot(`null`);
    expect(parseSearch("")).toMatchInlineSnapshot(`null`);
    expect(
      parseSearch("5!not-a-number!400!type!label!1!name!context"),
    ).toMatchInlineSnapshot(`null`);
    // need at least a label
    expect(parseSearch("5!45!400")).toMatchInlineSnapshot(`null`);
    expect(parseSearch("5!45!400!type!label")).toMatchInlineSnapshot(`null`);
    expect(
      parseSearch(
        "5!45!400!withdelimiter!label!0!with%20space!sp%C3%A9l%C3%A0@chars!0",
      ),
    ).toMatchInlineSnapshot(`null`);
  });
});
