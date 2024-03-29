import { assertType, describe, test } from "vitest";
import { type MapOptions } from "maplibre-gl";
import {
  MapHandlerOptionName,
  MapInitialOptionName,
  MapNonReactiveOptionName,
  MapReactiveOptionName,
  initialOptionNames,
  reactiveOptionNames,
} from "./map";

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

    type ExhaustiveReactiveOptionNames = (typeof reactiveOptionNames)[number];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Test1 = Expect<Equal<ExhaustiveReactiveOptionNames, MapReactiveOptionName>>;

    type ExhaustiveInitialOptionNames = (typeof initialOptionNames)[number];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Test2 = Expect<Equal<ExhaustiveInitialOptionNames, MapInitialOptionName>>;
  });
});
