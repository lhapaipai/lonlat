```ts
export type MapLibreEvent<TOrig = unknown> = {
	type: keyof MapEventType | keyof MapLayerEventType;
	target: Map$1;
	originalEvent: TOrig;
};

MapLibreEvent<TouchEvent>
MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>





/**
 * `MapMouseEvent` is the event type for mouse-related map events.
 *
 * @group Event Related
 */
export declare class MapMouseEvent extends Event$1 implements MapLibreEvent<MouseEvent> {
	type: "mousedown" | "mouseup" | "click" | "dblclick" | "mousemove" | "mouseover" | "mouseenter" | "mouseleave" | "mouseout" | "contextmenu";
	target: Map$1;
	originalEvent: MouseEvent;
	point: Point;
	lngLat: LngLat;
	preventDefault(): void;
	get defaultPrevented(): boolean;
	_defaultPrevented: boolean;
	constructor(type: string, map: Map$1, originalEvent: MouseEvent, data?: any);
}

/**
 * `MapTouchEvent` is the event type for touch-related map events.
 *
 * @group Event Related
 */
export declare class MapTouchEvent extends Event$1 implements MapLibreEvent<TouchEvent> {
	type: "touchstart" | "touchmove" | "touchend" | "touchcancel";
	target: Map$1;
	originalEvent: TouchEvent;
	lngLat: LngLat;
	point: Point;
	points: Array<Point>;
	lngLats: Array<LngLat>;
	preventDefault(): void;
	get defaultPrevented(): boolean;
	_defaultPrevented: boolean;
	constructor(type: string, map: Map$1, originalEvent: TouchEvent);
}

/**
 * `MapWheelEvent` is the event type for the `wheel` map event.
 *
 * @group Event Related
 */
export declare class MapWheelEvent extends Event$1 {
	type: "wheel";
	target: Map$1;
	originalEvent: WheelEvent;
	preventDefault(): void;
	get defaultPrevented(): boolean;
	_defaultPrevented: boolean;
	constructor(type: string, map: Map$1, originalEvent: WheelEvent);
}
