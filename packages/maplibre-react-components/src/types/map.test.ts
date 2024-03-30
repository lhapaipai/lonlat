import { assertType, describe, test } from "vitest";
import { type MapOptions } from "maplibre-gl";

import {
  MapReactiveOptionName,
  MapNonReactiveOptionName,
  MapHandlerOptionName,
} from "../lib/MapManager";

export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

export type Expect<T extends true> = T;

describe("map types", () => {
  test("MapOptions", () => {
    // test if we cover all MapOptions
    assertType<
      Omit<
        MapOptions,
        | MapNonReactiveOptionName
        | MapHandlerOptionName
        | MapReactiveOptionName
        | "container"
        | "style"
      >
    >(Object);
  });
});
