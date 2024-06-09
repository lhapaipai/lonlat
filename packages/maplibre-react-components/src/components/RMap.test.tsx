import { afterEach, assertType, describe, test, vi, expect, beforeEach } from "vitest";
import { Map, type MapOptions } from "maplibre-gl";

import { cleanup, render, screen } from "@testing-library/react";

import {
  MapReactiveOptionName,
  MapNonReactiveOptionName,
  MapHandlerOptionName,
} from "../lib/MapManager";
import { RMap } from "./RMap";
import { beforeMapTest } from "../tests/util";
import { emptyStyle } from "../lib/util";
import { MutableRefObject } from "react";

beforeEach(() => {
  beforeMapTest();
});
afterEach(() => {
  cleanup();
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

  test("Render identically than vanilla Maplibre", async ({ expect }) => {
    const { container } = render(
      <RMap mapStyle={emptyStyle} initialAttributionControl={false}></RMap>,
    );
    screen.debug();
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
    const { rerender, unmount } = render(<RMap mapStyle={emptyStyle} onMounted={onMounted}></RMap>);
    rerender(<RMap mapStyle={emptyStyle} onMounted={onMounted}></RMap>);
    unmount();

    expect(onMounted).toBeCalledTimes(1);
  });

  test("RMap forward map ref", async ({ expect }) => {
    const ref = { current: undefined };

    render(<RMap ref={ref} mapStyle={emptyStyle} />);

    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(Map);
  });

  test.only("RMap update reactive options", async () => {
    const ref: MutableRefObject<Map | null> = { current: null };
    const { rerender } = render(<RMap ref={ref} minZoom={10} maxZoom={14} pixelRatio={1} />);

    const map1 = ref.current!;
    expect(map1.getMinZoom()).toBe(10);
    expect(map1.getMaxZoom()).toBe(14);

    rerender(<RMap ref={ref} minZoom={11} maxZoom={13} pixelRatio={1} />);

    const map2 = ref.current!;

    screen.debug();
    expect(map1).toBe(map2);
    expect(map2.getMinZoom()).toBe(11);
    expect(map2.getMaxZoom()).toBe(13);
  });
});
