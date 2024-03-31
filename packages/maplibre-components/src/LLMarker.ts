import { Map, MapMouseEvent, MapTouchEvent, Marker, MarkerOptions, Popup } from "maplibre-gl";
import { DOM } from "maplibre-gl/src/util/dom";

import "./LLMarker.scss";
import LLPopup, { arrowHeight } from "./LLPopup";

export interface LLMarkerOptions extends MarkerOptions {
  icon?: string;
  text?: string;
}

const defaultColor = "#ffe64b";
const defaultHeight = 50;

export default class LLMarker extends Marker {
  _icon: string;
  _height = defaultHeight;
  _text?: string;
  // @ts-ignore
  _popup?: Popup | LLPopup;

  constructor(options?: LLMarkerOptions) {
    const useDefaultMarker = !options || !options.element;

    if (useDefaultMarker) {
      options ??= {};
      options.element = DOM.create("div", "ll-marker");
    }

    super(options);

    this._anchor = (options && options.anchor) || "bottom";
    this._color = (options && options.color) || defaultColor;
    this._icon = (options && options.icon) || "fe-star";
    this._text = options && options.text;

    if (useDefaultMarker) {
      this._defaultMarker = true;

      this._element.setAttribute("aria-label", "Map marker");
      this._element.setAttribute("tabindex", "0");

      this.setScale(this._scale);
      this.setColor(this._color);

      const container = DOM.create("div");
      DOM.create("div", "ovale", container);
      if (this._text) {
        const $text = DOM.create("div", "text", container);
        $text.innerText = this._text;
      } else {
        DOM.create("i", this._icon, container);
      }

      const target = DOM.create("div", "target");

      this._element.appendChild(container);
      this._element.appendChild(target);
    }
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

  setColor(color?: string): this {
    this._color = color || defaultColor;
    this._element.style.setProperty("--marker-color", this._color);
    return this;
  }

  setScale(scale = 1, markerHeight = defaultHeight): this {
    this._scale = scale;
    this._height = markerHeight * this._scale;
    this._element.style.setProperty("--marker-size", `${this._height}px`);

    return this;
  }

  setPopup(popup?: Popup | LLPopup | null): this {
    if (this._popup) {
      this._popup.remove();
      delete this._popup;
      this._element.removeEventListener("keypress", this._onKeyPress);

      if (!this._originalTabIndex) {
        this._element.removeAttribute("tabindex");
      }
    }

    if (popup) {
      if (!("offset" in popup.options)) {
        // offset of LLPopup is typed as OffsetOptions
        // not Offset like Popup
        if (popup instanceof LLPopup) {
          popup.options.offset = {
            mainAxis: this._height + arrowHeight,
          };
        } else {
          popup.options.offset = this._height + arrowHeight;
        }
      }

      this._popup = popup;
      if (this._lngLat) this._popup.setLngLat(this._lngLat);

      this._originalTabIndex = this._element.getAttribute("tabindex") || "";
      if (!this._originalTabIndex) {
        this._element.setAttribute("tabindex", "0");
      }
      this._element.addEventListener("keypress", this._onKeyPress);
    }

    return this;
  }
}
