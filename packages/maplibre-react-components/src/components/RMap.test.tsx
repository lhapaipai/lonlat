import { afterEach, assertType, describe, test } from "vitest";
import { type MapOptions } from "maplibre-gl";

import { cleanup, render, screen } from "@testing-library/react";

import {
  MapReactiveOptionName,
  MapNonReactiveOptionName,
  MapHandlerOptionName,
} from "../lib/MapManager";
import RMap from "./RMap";
import { beforeMapTest } from "../tests/util";

afterEach(() => {
  cleanup();
  beforeMapTest();
});

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

  test("basic1", async () => {
    const marignier = { lng: 6.498, lat: 46.089 };

    const { getByRole, unmount } = render(
      <RMap initialCenter={marignier} mapStyle="https://demotiles.maplibre.org/style.json"></RMap>,
    );

    screen.debug();
  });
});
