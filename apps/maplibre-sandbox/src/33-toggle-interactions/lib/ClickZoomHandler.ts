import { Handler, Point, Map } from "maplibre-gl";

export class ClickZoomHandler implements Handler {
  _active!: boolean;
  _enabled: boolean;
  _map: Map;

  constructor(map: Map) {
    console.log("construct ClickZoomHandler");
    this._map = map;
    this.reset();
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

  dblclick(e: MouseEvent, point: Point) {
    console.log("dblclick");
    e.preventDefault();
    return {
      cameraAnimation: (map: Map) => {
        map.easeTo(
          {
            duration: 300,
            zoom: this._map.getZoom() + (e.shiftKey ? -1 : 1),
            around: this._map.unproject(point),
          },
          { originalEvent: e },
        );
      },
    };
  }
}
