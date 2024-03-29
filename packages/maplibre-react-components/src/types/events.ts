import {
  MapContextEvent,
  MapDataEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  MapLibreEvent,
  MapLibreZoomEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapStyleImageMissingEvent,
  MapTerrainEvent,
  MapWheelEvent,
} from "maplibre-gl";

/**
 * pointerEventHandlers
 * cameraEventHandlers
 * otherEventHandlers
 */
export const eventHandlers = {
  /** pointerEventHandlers */
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onMouseOver: "mouseover",
  onMouseOut: "mouseout",
  onMouseMove: "mousemove",
  onMouseEnter: "mouseenter",
  onMouseLeave: "mouseleave",
  onClick: "click",
  onDblClick: "dblclick",
  onContextMenu: "contextmenu",
  onTouchStart: "touchstart",
  onTouchEnd: "touchend",
  onTouchCancel: "touchcancel",
  onTouchMove: "touchmove",

  /** cameraEventHandlers */
  onMoveStart: "movestart",
  onMove: "move",
  onMoveEnd: "moveend",
  onDragStart: "dragstart",
  onDrag: "drag",
  onDragEnd: "dragend",
  onZoomStart: "zoomstart",
  onZoom: "zoom",
  onZoomEnd: "zoomend",
  onRotateStart: "rotatestart",
  onRotate: "rotate",
  onRotateEnd: "rotateend",
  onPitchStart: "pitchstart",
  onPitch: "pitch",
  onPitchEnd: "pitchend",

  /** otherEventHandlers */
  onWheel: "wheel",
  onResize: "resize",
  onRemove: "remove",
  onBoxZoomStart: "boxzoomstart",
  onBoxZoomEnd: "boxzoomend",
  onBoxZoomCancel: "boxzoomcancel",
  onWebglContextLost: "webglcontextlost",
  onWebglContextRestored: "webglcontextrestored",
  onLoad: "load",
  onRender: "render",
  onIdle: "idle",
  onError: "error",
  onData: "data",
  onStyleData: "styledata",
  onSourceData: "sourcedata",
  onDataLoading: "dataloading",
  onStyleDataLoading: "styledataloading",
  onSourceDataLoading: "sourcedataloading",
  onTileDataLoading: "tiledataloading",
  onStyleImageMissing: "styleimagemissing",
  onDataAbort: "dataabort",
  onSourceDataAbort: "sourcedataabort",
  onTerrain: "terrain",
} as const;

export const mapEvents = {
  /** pointerEventHandlers */
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

  /** cameraEventHandlers */
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

  /** otherEventHandlers */
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
// export const otherEvents = {
//   wheel: "onWheel",
//   resize: "onResize",
//   remove: "onRemove",

//   boxzoomstart: "onBoxZoomStart",
//   boxzoomend: "onBoxZoomEnd",
//   boxzoomcancel: "onBoxZoomCancel",
//   webglcontextlost: "",
//   webglcontextrestored: "",
//   load: "onLoad",
//   render: "onRender",
//   idle: "onIdle",
//   error: "onError",
//   data: "onData",
//   styledata: "onStyleData",
//   sourcedata: "onSourceData",

//   dataloading: "onDataLoading",
//   styledataloading: "onStyleDataLoading",
//   sourcedataloading: "onSourceDataLoading",
//   tiledataloading: "onTileDataLoading",
//   styleimagemissing: "onStyleImageMissing",
//   dataabort: "onDataAbort",
//   sourcedataabort: "onSourceDataAbort",
//   terrain: "onTerrain",
// };
// export const pointerEvents = {
//   mousedown: "onMouseDown",
//   mouseup: "onMouseUp",
//   mouseover: "onMouseOver",
//   mouseout: "onMouseOut",
//   mousemove: "onMouseMove",
//   mouseenter: "onMouseEnter",
//   mouseleave: "onMouseLeave",
//   click: "onClick",
//   dblclick: "onDblClick",
//   contextmenu: "onContextMenu",
//   touchstart: "onTouchStart",
//   touchend: "onTouchEnd",
//   touchcancel: "onTouchCancel",
//   touchmove: "onTouchMove",
// };

// export const cameraEvents = {
//   movestart: "onMoveStart",
//   move: "onMove",
//   moveend: "onMoveEnd",
//   dragstart: "onDragStart",
//   drag: "onDrag",
//   dragend: "onDragEnd",
//   zoomstart: "onZoomStart",
//   zoom: "onZoom",
//   zoomend: "onZoomEnd",
//   rotatestart: "onRotateStart",
//   rotate: "onRotate",
//   rotateend: "onRotateEnd",
//   pitchstart: "onPitchStart",
//   pitch: "onPitch",
//   pitchend: "onPitchEnd",
// };

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

  // onMoveStart?: (e: ViewStateChangeEvent) => void;
  // onMove?: (e: ViewStateChangeEvent) => void;
  // onMoveEnd?: (e: ViewStateChangeEvent) => void;
  // onDragStart?: (e: ViewStateChangeEvent) => void;
  // onDrag?: (e: ViewStateChangeEvent) => void;
  // onDragEnd?: (e: ViewStateChangeEvent) => void;
  // onZoomStart?: (e: ViewStateChangeEvent) => void;
  // onZoom?: (e: ViewStateChangeEvent) => void;
  // onZoomEnd?: (e: ViewStateChangeEvent) => void;
  // onRotateStart?: (e: ViewStateChangeEvent) => void;
  // onRotate?: (e: ViewStateChangeEvent) => void;
  // onRotateEnd?: (e: ViewStateChangeEvent) => void;
  // onPitchStart?: (e: ViewStateChangeEvent) => void;
  // onPitch?: (e: ViewStateChangeEvent) => void;
  // onPitchEnd?: (e: ViewStateChangeEvent) => void;
  // onBoxZoomStart?: (e: MapBoxZoomEvent) => void;
  // onBoxZoomEnd?: (e: MapBoxZoomEvent) => void;
  // onBoxZoomCancel?: (e: MapBoxZoomEvent) => void;

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

  /* attention */
  onRender?: (e: MapLibreEvent) => void;

  onIdle?: (e: MapLibreEvent) => void;
  onError?: (e: ErrorEvent) => void;
  onData?: (e: MapDataEvent) => void;

  /* attention */
  onStyleData?: (e: MapStyleDataEvent) => void;
  /* attention */
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
