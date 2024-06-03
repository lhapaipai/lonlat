import { Handler, Map } from "maplibre-gl";
import { DOM } from "maplibre-gl/src/util/dom";

// import { DOM } from "./dom";

export default class ContextHandler implements Handler {
  _map: Map;
  _active: boolean = false;
  _enabled: boolean = false;

  constructor(map: Map) {
    this._map = map;
  }

  enable(): void {
    this._enabled = true;
  }

  disable(): void {
    this._enabled = false;
    this.reset();
  }

  isEnabled(): boolean {
    return this._enabled;
  }

  isActive(): boolean {
    return this._active;
  }

  reset(): void {
    this._active = false;
  }

  contextmenu(e: MouseEvent) {
    const point = DOM.mousePos(this._map.getCanvas(), e);
    const lngLat = this._map.unproject(point);
    console.log("contextmenu", e, point, lngLat);
  }
}
