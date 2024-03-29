import { MapOptions } from "maplibre-gl";

export type MapNonReactiveOptionName =
  | "hash"
  | "interactive"
  | "bearingSnap"
  | "attributionControl"
  | "maplibreLogo"
  | "logoPosition"
  | "failIfMajorPerformanceCaveat"
  | "preserveDrawingBuffer"
  | "antialias"
  | "refreshExpiredTiles"
  | "trackResize"
  | "maxTileCacheSize"
  | "maxTileCacheZoomLevels"
  | "transformRequest"
  | "transformCameraUpdate"
  | "locale"
  | "fadeDuration"
  | "crossSourceCollisions"
  | "collectResourceTiming"
  | "clickTolerance"
  | "validateStyle"
  | "maxCanvasSize"
  | "center"
  | "zoom"
  | "bearing"
  | "pitch"
  | "bounds"
  | "fitBoundsOptions"
  | "localIdeographFontFamily";

export type MapInitialOptionName = `initial${Capitalize<MapNonReactiveOptionName>}`;

export type MapHandlerOptionName =
  | "scrollZoom"
  | "boxZoom"
  | "dragRotate"
  | "dragPan"
  | "keyboard"
  | "doubleClickZoom"
  | "touchZoomRotate"
  | "touchPitch"
  | "cooperativeGestures"
  | "pitchWithRotate";

export type MapReactiveOptionName =
  | "maxBounds"
  | "minZoom"
  | "maxZoom"
  | "minPitch"
  | "maxPitch"
  | "renderWorldCopies"
  | "pixelRatio";

export type MapInitialOptions = {
  [key in MapNonReactiveOptionName as `initial${Capitalize<key>}`]: MapOptions[key];
};

export type MapReactiveOptions = {
  [key in MapReactiveOptionName]: MapOptions[key];
};

export type MapHandlerOptions = {
  [key in MapHandlerOptionName]: MapOptions[key];
};

export const reactiveOptionNames = [
  "maxBounds",
  "minZoom",
  "maxZoom",
  "minPitch",
  "maxPitch",
  "renderWorldCopies",
  "pixelRatio",
] as const;

export const initialOptionNames = [
  "initialHash",
  "initialInteractive",
  "initialBearingSnap",
  "initialAttributionControl",
  "initialMaplibreLogo",
  "initialLogoPosition",
  "initialFailIfMajorPerformanceCaveat",
  "initialPreserveDrawingBuffer",
  "initialAntialias",
  "initialRefreshExpiredTiles",
  "initialTrackResize",
  "initialMaxTileCacheSize",
  "initialMaxTileCacheZoomLevels",
  "initialTransformRequest",
  "initialTransformCameraUpdate",
  "initialLocale",
  "initialFadeDuration",
  "initialCrossSourceCollisions",
  "initialCollectResourceTiming",
  "initialClickTolerance",
  "initialValidateStyle",
  "initialMaxCanvasSize",
  "initialLocalIdeographFontFamily",

  "initialCenter",
  "initialZoom",
  "initialBearing",
  "initialPitch",
  "initialBounds", // overrides center and zoom
  "initialFitBoundsOptions", // only if bounds set and only for initial state
] as const;

export const handlerNames = [
  "scrollZoom",
  "boxZoom",
  "dragRotate",
  "dragPan",
  "keyboard",
  "doubleClickZoom",
  "touchZoomRotate",
  "touchPitch",
  "cooperativeGestures",
  "pitchWithRotate",
] as const;
