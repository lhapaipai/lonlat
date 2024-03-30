import { assertType, describe, test } from "vitest";
import { MarkerOptions } from "maplibre-gl";

import { MarkerNonReactiveOptionName, MarkerReactiveOptionName } from "./RMarker";

describe("RMap", () => {
  test("MarkerOptions exhaustivity", () => {
    // test if we cover all MapOptions
    assertType<
      Omit<MarkerOptions, MarkerNonReactiveOptionName | MarkerReactiveOptionName | "element">
    >(Object);
  });
});
