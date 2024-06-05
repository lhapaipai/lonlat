import { assertType, describe, test } from "vitest";
import { type MapOptions } from "maplibre-gl";

import {
  MapReactiveOptionName,
  MapNonReactiveOptionName,
  MapHandlerOptionName,
} from "../lib/MapManager";

describe("RMap", () => {
  test("MapOptions exhaustivity", () => {
    // test if we cover all MapOptions
    assertType<
      Omit<
        MapOptions,
        | MapNonReactiveOptionName
        | MapHandlerOptionName
        | MapReactiveOptionName
        | "container"
        | "style"
        | "cancelPendingTileRequestsWhileZooming"
      >
    >(Object);
  });
});
