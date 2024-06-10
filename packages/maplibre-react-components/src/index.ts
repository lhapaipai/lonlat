"use client";
/**
 * solve issue : The inferred type of 'RLayer' cannot be named without a reference to '.pnpm/@types+mapbox__vector-tile
 * import type {} from "@mapbox/vector-tile";
 *
 * solve issue : The inferred type of 'RLayer' cannot be named without a reference to '.pnpm/@types+geojson
 * import type {} from "geojson";
 *
 * always issue : The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 * come from : packages/maplibre-react-components/src/components/RLayer.tsx
 * type StyleLayer = Exclude<ReturnType<Map["getLayer"]>, undefined>;
 * solved with : type StyleLayer = unknown;
 */

export { RMap } from "./components/RMap";
export { RMarker } from "./components/RMarker";
export { RPopup } from "./components/RPopup";
export { RLayer } from "./components/RLayer";
export { RSource } from "./components/RSource";
export { RTerrain } from "./components/RTerrain";
export {
  ContextMenuEventDispatcher,
  type MaplibreContextmenuEventDetail,
} from "./components/ContextMenuEventDispatcher";

export { RAttributionControl } from "./controls/RAttributionControl";
export { RFullscreenControl } from "./controls/RFullscreenControl";
export { RGeolocateControl } from "./controls/RGeolocateControl";
export { RLogoControl } from "./controls/RLogoControl";
export { RNavigationControl } from "./controls/RNavigationControl";
export { RScaleControl } from "./controls/RScaleControl";
export { RTerrainControl } from "./controls/RTerrainControl";

export { useMap } from "./hooks/useMap";
export { useRControl } from "./hooks/useRControl";
export { useControl } from "./hooks/useControl";
export { useMapAndCanvasRefs } from "./hooks/useMapAndCanvasRefs";

export * from "./lib/util";

export { type Event } from "./types.d";

export { mapLibreContext, type MapLibreContext } from "./context";
