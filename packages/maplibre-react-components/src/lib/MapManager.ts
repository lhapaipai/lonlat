import {
  Map,
  type PaddingOptions,
  type StyleSpecification,
  type MapOptions,
  type MapContextEvent,
  type MapDataEvent,
  type MapLayerMouseEvent,
  type MapLayerTouchEvent,
  type MapLibreEvent,
  type MapLibreZoomEvent,
  type MapSourceDataEvent,
  type MapStyleDataEvent,
  type MapStyleImageMissingEvent,
  type MapTerrainEvent,
  type MapWheelEvent,
} from "maplibre-gl";
import { filterMapProps, transformPropsToOptions } from "./util";

import { deepEqual } from "maplibre-gl/src/util/util";

const eventNameToCallback = {
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mouseout: "onMouseOut",
  mousemove: "onMouseMove",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  click: "onClick",
  dblclick: "onDblClick",
  contextmenu: "onContextMenu",
  touchstart: "onTouchStart",
  touchend: "onTouchEnd",
  touchcancel: "onTouchCancel",
  touchmove: "onTouchMove",

  movestart: "onMoveStart",
  move: "onMove",
  moveend: "onMoveEnd",
  dragstart: "onDragStart",
  drag: "onDrag",
  dragend: "onDragEnd",
  zoomstart: "onZoomStart",
  zoom: "onZoom",
  zoomend: "onZoomEnd",
  rotatestart: "onRotateStart",
  rotate: "onRotate",
  rotateend: "onRotateEnd",
  pitchstart: "onPitchStart",
  pitch: "onPitch",
  pitchend: "onPitchEnd",

  wheel: "onWheel",
  resize: "onResize",
  remove: "onRemove",
  boxzoomstart: "onBoxZoomStart",
  boxzoomend: "onBoxZoomEnd",
  boxzoomcancel: "onBoxZoomCancel",
  webglcontextlost: "onWebglContextLost",
  webglcontextrestored: "onWebglContextRestored",
  load: "onLoad",
  render: "onRender",
  idle: "onIdle",
  error: "onError",
  data: "onData",
  styledata: "onStyleData",
  sourcedata: "onSourceData",
  dataloading: "onDataLoading",
  styledataloading: "onStyleDataLoading",
  sourcedataloading: "onSourceDataLoading",
  tiledataloading: "onTileDataLoading",
  styleimagemissing: "onStyleImageMissing",
  dataabort: "onDataAbort",
  sourcedataabort: "onSourceDataAbort",
  terrain: "onTerrain",
} as const;

type MapEvent =
  | MapLayerMouseEvent
  | MapLayerTouchEvent
  | MapWheelEvent
  | MapLibreEvent
  | MapLibreZoomEvent
  | MapContextEvent
  | ErrorEvent
  | MapDataEvent
  | MapStyleDataEvent
  | MapSourceDataEvent
  | MapStyleImageMissingEvent
  | MapTerrainEvent;

export type MapCallbacks = {
  /** Compatible with `layerId` */
  onMouseDown?: (e: MapLayerMouseEvent) => void;
  onMouseUp?: (e: MapLayerMouseEvent) => void;
  onMouseOver?: (e: MapLayerMouseEvent) => void;
  onMouseOut?: (e: MapLayerMouseEvent) => void;
  onMouseMove?: (e: MapLayerMouseEvent) => void;
  onMouseEnter?: (e: MapLayerMouseEvent) => void;
  onMouseLeave?: (e: MapLayerMouseEvent) => void;
  onClick?: (e: MapLayerMouseEvent) => void;
  onDblClick?: (e: MapLayerMouseEvent) => void;
  onContextMenu?: (e: MapLayerMouseEvent) => void;
  onTouchStart?: (e: MapLayerTouchEvent) => void;
  onTouchEnd?: (e: MapLayerTouchEvent) => void;
  onTouchCancel?: (e: MapLayerTouchEvent) => void;
  onTouchMove?: (e: MapLayerTouchEvent) => void;

  /** Not compatible with `layerId` */
  onWheel?: (e: MapWheelEvent) => void;
  onResize?: (e: MapLibreEvent) => void;
  onRemove?: (e: MapLibreEvent) => void;

  onMoveStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onMove?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onMoveEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onDragStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onDrag?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onDragEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onZoomStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onZoom?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onZoomEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>) => void;
  onRotateStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onRotate?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onRotateEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onPitchStart?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onPitch?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;
  onPitchEnd?: (e: MapLibreEvent<MouseEvent | TouchEvent | undefined>) => void;

  onBoxZoomStart?: (e: MapLibreZoomEvent) => void;
  onBoxZoomEnd?: (e: MapLibreZoomEvent) => void;
  onBoxZoomCancel?: (e: MapLibreZoomEvent) => void;
  onWebglContextLost?: (e: MapContextEvent) => void;
  onWebglContextRestored?: (e: MapContextEvent) => void;
  onLoad?: (e: MapLibreEvent) => void;
  onRender?: (e: MapLibreEvent) => void;
  onIdle?: (e: MapLibreEvent) => void;
  onError?: (e: ErrorEvent) => void;
  onData?: (e: MapDataEvent) => void;
  onStyleData?: (e: MapStyleDataEvent) => void;
  onSourceData?: (e: MapSourceDataEvent) => void;
  onDataLoading?: (e: MapDataEvent) => void;
  onStyleDataLoading?: (e: MapStyleDataEvent) => void;
  onSourceDataLoading?: (e: MapSourceDataEvent) => void;
  onTileDataLoading?: (e: MapDataEvent) => void;
  onStyleImageMissing?: (e: MapStyleImageMissingEvent) => void;
  onDataAbort?: (e: MapDataEvent) => void;
  onSourceDataAbort?: (e: MapSourceDataEvent) => void;
  onTerrain?: (e: MapTerrainEvent) => void;
};

export const mapReactiveOptionNames = [
  "maxBounds",
  "minZoom",
  "maxZoom",
  "minPitch",
  "maxPitch",
  "renderWorldCopies",
  "pixelRatio",
] as const;
export type MapReactiveOptionName = (typeof mapReactiveOptionNames)[number];
export type MapReactiveOptions = {
  [key in MapReactiveOptionName]?: MapOptions[key];
};

export const mapNonReactiveOptionNames = [
  "hash",
  "interactive",
  "bearingSnap",
  "attributionControl",
  "maplibreLogo",
  "logoPosition",
  "failIfMajorPerformanceCaveat",
  "preserveDrawingBuffer",
  "antialias",
  "refreshExpiredTiles",
  "trackResize",
  "maxTileCacheSize",
  "maxTileCacheZoomLevels",
  "transformRequest",
  "transformCameraUpdate",
  "locale",
  "fadeDuration",
  "crossSourceCollisions",
  "collectResourceTiming",
  "clickTolerance",
  "validateStyle",
  "maxCanvasSize",

  "center",
  "zoom",
  "bearing",
  "pitch",
  "bounds", // overrides center and zoom
  "fitBoundsOptions", // only if bounds set and only for initial state

  "localIdeographFontFamily",
  "pitchWithRotate", // see non reactive handler
] as const;
export type MapNonReactiveOptionName = (typeof mapNonReactiveOptionNames)[number];
export type MapInitialOptionName = `initial${Capitalize<MapNonReactiveOptionName>}`;
export type MapInitialOptions = {
  [key in MapNonReactiveOptionName as `initial${Capitalize<key>}`]?: MapOptions[key];
};

export const mapHandlerNames = [
  "scrollZoom",
  "boxZoom",
  "dragRotate",
  "dragPan",
  "keyboard",
  "doubleClickZoom",
  "touchZoomRotate",
  "touchPitch",
  "cooperativeGestures",
  // "pitchWithRotate", // available as option but not as reactive... add has initial ?
  // test in sandbox
] as const;
export type MapHandlerOptionName = (typeof mapHandlerNames)[number];
export type MapHandlerOptions = {
  [key in MapHandlerOptionName]?: MapOptions[key];
};

export type ManagerOptions = {
  mapStyle?: StyleSpecification | string;
  styleDiffing?: boolean;
  padding?: PaddingOptions;

  // terrain?: StyleSpecification["terrain"];
  // interactiveLayerIds?: string[];
};

export type MapProps = MapInitialOptions & MapReactiveOptions & MapHandlerOptions & MapCallbacks;

const DEFAULT_STYLE = "https://demotiles.maplibre.org/style.json";

export default class MapManager {
  reactiveOptions: MapReactiveOptions = {};
  handlerOptions: MapHandlerOptions = {};
  callbacks: MapCallbacks;

  private _map: Map;

  padding?: PaddingOptions;
  mapStyle: string | StyleSpecification;

  constructor(
    { mapStyle = DEFAULT_STYLE, padding }: ManagerOptions,
    mapProps: MapProps,
    container: HTMLDivElement,
  ) {
    this.mapStyle = mapStyle;
    this.padding = padding;

    const [mapBaseOptions, callbacks] = transformPropsToOptions(mapProps) as [
      Omit<MapOptions, "style" | "container">,
      MapCallbacks,
    ];

    this.callbacks = callbacks;

    const mapOptions = {
      ...mapBaseOptions,
      container,
      style: mapStyle,
    };

    const map = new Map(mapOptions);

    if (padding) {
      map.setPadding(padding);
    }

    for (const key of Object.keys(callbacks)) {
      const eventName = (key[2].toLowerCase() +
        key.substring(3)) as keyof typeof eventNameToCallback;
      if (eventName in eventNameToCallback) {
        console.log("register event listener on", eventName);
        map.on(eventName, this._onMapEvent);
      }
    }

    this._map = map;
  }

  setProps(
    { mapStyle = DEFAULT_STYLE, styleDiffing = true, padding }: ManagerOptions,
    mapProps: MapProps,
  ) {
    const [reactiveOptions, callbacks, handlerOptions] = filterMapProps(mapProps);

    this._updateCallbacks(callbacks);
    this._updateStyle(mapStyle, styleDiffing);
    this._updateSettings(reactiveOptions, { padding });
    this._updateHandlers(handlerOptions);
  }

  _updateStyle(nextStyle: StyleSpecification | string, styleDiffing: boolean) {
    const curStyle = this.mapStyle;

    if (nextStyle !== curStyle) {
      this.mapStyle = nextStyle;
      this._map.setStyle(nextStyle, {
        diff: styleDiffing,
      });
    }
  }

  _updateSettings(
    nextReactiveOptions: MapReactiveOptions,
    { padding }: { padding?: PaddingOptions },
  ) {
    const currReactiveOptions = this.reactiveOptions;
    this.reactiveOptions = nextReactiveOptions;

    for (const optionName of mapReactiveOptionNames) {
      if (
        optionName in nextReactiveOptions &&
        !deepEqual(currReactiveOptions[optionName], nextReactiveOptions[optionName])
      ) {
        const setterName = `set${optionName[0].toUpperCase()}${optionName.substring(1)}`;
        // @ts-ignore
        this._map[setterName](nextReactiveOptions[optionName]);
      }
    }

    if (padding && !deepEqual(this.padding, padding)) {
      this._map.setPadding(padding);
    }
    this.padding = padding;
  }

  _updateCallbacks(callbacks: MapCallbacks) {
    this.callbacks = callbacks;
  }

  _updateHandlers(nextHandlers: MapHandlerOptions) {
    const currHandlers = this.handlerOptions;
    this.handlerOptions = nextHandlers;

    for (const propName of mapHandlerNames) {
      const nextValue = nextHandlers[propName] ?? true;
      const currValue = currHandlers[propName] ?? true;
      if (!deepEqual(nextValue, currValue)) {
        if (nextValue) {
          // enable can have options `scrollZoom` / `twoFingersTouch` / `dragPan` / `touchZoomRotate`
          // @ts-ignore
          this._map[propName].enable(nextValue);
        } else {
          this._map[propName].disable();
        }
      }
    }
  }

  _onMapEvent = (e: MapEvent) => {
    const eventType = e.type as keyof typeof eventNameToCallback;
    const callbackName = eventNameToCallback[eventType];
    if (this.callbacks[callbackName]) {
      // @ts-ignore
      this.callbacks[callbackName]?.(e);
    } else if (e.type === "error") {
      console.error(e);
    } else {
      console.info("not managed RMap event", eventType, e);
    }
  };

  get map() {
    return this._map;
  }

  destroy() {
    this._map.remove();
  }
}
