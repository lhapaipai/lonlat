import { Map, MapMouseEvent, MapTouchEvent, Marker, MarkerOptions, Point } from "maplibre-gl";
import { DOM } from "maplibre-gl/src/util/dom";

import "./LLMarker.scss";

export interface LLPegmanOptions extends MarkerOptions {
  bearing?: number;
}

const defaultHeight = 60;

export default class LLPegman extends Marker {
  _height = defaultHeight;
  _bearing: number;
  declare _zone: number;

  constructor(options?: LLPegmanOptions) {
    const useDefaultMarker = !options || !options.element;

    if (useDefaultMarker) {
      options ??= {};
      options.element = DOM.create("div", "ll-marker pegman");
    }

    super(options);

    this._offset = Point.convert([0, 16]);
    this._anchor = (options && options.anchor) || "bottom";
    this._bearing = (options && options.bearing) || 0;

    if (useDefaultMarker) {
      this._defaultMarker = true;

      this._element.setAttribute("aria-label", "Map marker");
      this._element.setAttribute("tabindex", "0");

      this.setScale(this._scale);

      DOM.create("div", "image", this._element);
      DOM.create("div", "target", this._element);
    }

    this.updateZone();
  }

  _onActive = (e: MapMouseEvent | MapTouchEvent) => {
    if (this._element.contains(e.originalEvent.target as any)) {
      this._map.once("mouseup", this._onInactive);
      this._map.once("touchend", this._onInactive);

      this._element.classList.add("active");
    }
  };

  _onInactive = () => {
    this._element.classList.remove("active");
  };

  addTo(map: Map): this {
    Marker.prototype.addTo.apply(this, [map]);
    this._map.on("mousedown", this._onActive);
    this._map.on("touchstart", this._onActive);

    return this;
  }

  remove(): this {
    if (this._map) {
      this._map.off("mousedown", this._onActive);
      this._map.off("touchstart", this._onActive);
    }

    Marker.prototype.remove.apply(this);

    return this;
  }

  setBearing(bearing: number): this {
    this._bearing = bearing;
    this.updateZone();

    return this;
  }

  updateZone() {
    if (this._element.classList.contains(`zone-${this._zone}`)) {
      this._element.classList.remove(`zone-${this._zone}`);
    }

    this._zone = (16 - Math.round(this._bearing / 22.5)) % 16;
    this._element.classList.add(`zone-${this._zone}`);
  }

  getBearing(): number {
    return this._bearing;
  }

  setScale(scale = 1, markerHeight = defaultHeight): this {
    this._scale = scale;
    this._height = markerHeight * this._scale;
    this._element.style.setProperty("--marker-size", `${this._height}px`);

    return this;
  }
}
