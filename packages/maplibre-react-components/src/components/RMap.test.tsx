import { afterEach, assertType, describe, expect, test, vi } from "vitest";
import { Map, type MapOptions } from "maplibre-gl";

import { cleanup, render, waitFor } from "@testing-library/react";

import {
  MapReactiveOptionName,
  MapNonReactiveOptionName,
  MapHandlerOptionName,
} from "../lib/MapManager";
import { RMap } from "./RMap";
import { beforeMapTest } from "../tests/util";

afterEach(() => {
  cleanup();
  beforeMapTest();
});

describe("RMap", () => {
  test("if RMapProps cover all MapOptions", () => {
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

  const defaultStyle = "https://demotiles.maplibre.org/style.json";

  test("Render identically than vanilla Maplibre", async () => {
    const marignier = { lng: 6.498, lat: 46.089 };

    const { container } = render(
      <RMap
        initialCenter={marignier}
        mapStyle={defaultStyle}
        initialAttributionControl={false}
      ></RMap>,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="maplibregl-map"
          style="position: relative; width: 100%; height: 100%;"
        >
          <div
            class="maplibregl-canvas-container maplibregl-interactive maplibregl-touch-drag-pan maplibregl-touch-zoom-rotate"
          >
            <canvas
              aria-label="Map"
              class="maplibregl-canvas"
              height="300"
              role="region"
              style="width: 400px; height: 300px;"
              tabindex="0"
              width="400"
            />
          </div>
          <div
            class="maplibregl-control-container"
          >
            <div
              class="maplibregl-ctrl-top-left "
            />
            <div
              class="maplibregl-ctrl-top-right "
            />
            <div
              class="maplibregl-ctrl-bottom-left "
            />
            <div
              class="maplibregl-ctrl-bottom-right "
            />
          </div>
          <div
            class="maplibregl-children"
            style="height: 100%;"
          />
        </div>
      </div>
    `);
  });

  test("call onMounted only at the first render", async ({ expect }) => {
    const onMounted = vi.fn();
    const { rerender, unmount } = render(
      <RMap mapStyle={defaultStyle} onMounted={onMounted}></RMap>,
    );
    rerender(<RMap mapStyle={defaultStyle} onMounted={onMounted}></RMap>);
    unmount();

    expect(onMounted).toBeCalledTimes(1);
  });

  test("RMap forward map ref", async ({ expect }) => {
    const ref = { current: undefined };

    render(<RMap ref={ref} mapStyle={defaultStyle}></RMap>);

    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });

    expect(ref.current).toBeInstanceOf(Map);
  });
});
