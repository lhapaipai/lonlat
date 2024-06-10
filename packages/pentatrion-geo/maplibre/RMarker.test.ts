import { assertType, describe, test } from "vitest";

import { LLMarkerNonReactiveOptionName, LLMarkerReactiveOptionName } from "./RLLMarker";
import { LLMarkerOptions } from "../LLMarker";

describe("RLLMarker", () => {
  test("LLMarkerOptions exhaustivity", () => {
    // test if we cover all LLMarkerOptions
    assertType<
      Omit<
        LLMarkerOptions,
        LLMarkerNonReactiveOptionName | LLMarkerReactiveOptionName | "element" | "anchor" | "offset"
      >
    >(Object);
  });
});
