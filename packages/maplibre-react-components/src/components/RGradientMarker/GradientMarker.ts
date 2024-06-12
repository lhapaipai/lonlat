import { Map, MapMouseEvent, MapTouchEvent, Marker, MarkerOptions, Popup } from "maplibre-gl";
import { DOM } from "../../maplibre-core/util/dom";

import { type FloatingPopup } from "../RFloatingPopup/FloatingPopup";
import { arrowHeight } from "../RFloatingPopup/util";
export interface GradientMarkerOptions extends MarkerOptions {
  icon?: string;
  text?: string;
  className?: string;
}

const defaultColor = "#ffe64b";
const defaultHeight = 50;

export class GradientMarker extends Marker {
  _icon?: string;
  _height = defaultHeight;
  _text?: string;
  // @ts-ignore
  _popup?: FloatingPopup | Popup;

  _iconElement?: HTMLElement;
  _textElement?: HTMLDivElement;

  constructor(options?: GradientMarkerOptions) {
    const useDefaultMarker = !options || !options.element;

    if (useDefaultMarker) {
      options ??= {};
      options.element = DOM.create("div", "ll-marker");
      if (options.className) {
        options.element.classList.add(options.className);
      }
    }

    super(options);

    if (this._draggable) {
      this._element.classList.add("draggable");
    }

    this._anchor = (options && options.anchor) || "bottom";
    this._color = (options && options.color) || defaultColor;
    this._icon = options && options.icon;
    this._text = options && options.text;

    if (useDefaultMarker) {
      this._defaultMarker = true;

      this._element.setAttribute("aria-label", "Map marker");
      this._element.setAttribute("tabindex", "0");

      this.setScale(this._scale);
      this.setColor(this._color);

      const container = DOM.create("div", "marker");
      DOM.create("div", "ovale", container);
      if (this._text) {
        this._textElement = DOM.create("div", "text", container);
        this._textElement.innerText = this._text;
      } else if (this._icon) {
        this._iconElement = DOM.create("i", this._icon, container);
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

  setIcon(icon?: string): this {
    this._icon = icon;
    if (this._iconElement) {
      this._iconElement.className = this._icon || "";
    }
    return this;
  }

  getIcon() {
    return this._icon;
  }

  setText(text?: string): this {
    this._text = text;
    if (this._textElement) {
      this._textElement.innerText = this._text || "";
    }
    return this;
  }

  getText() {
    return this._text;
  }

  setColor(color?: string): this {
    this._color = color || defaultColor;
    this._element.style.setProperty("--marker-color", this._color);
    return this;
  }

  getColor() {
    return this._color;
  }

  setScale(scale = 1, markerHeight = defaultHeight): this {
    this._scale = scale;
    this._height = markerHeight * this._scale;
    this._element.style.setProperty("--marker-size", `${this._height}px`);

    return this;
  }

  getScale() {
    return this._scale;
  }

  setPopup(popup?: FloatingPopup | Popup | null): this {
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
        // offset of FloatingPopup is typed as OffsetOptions
        // not Offset like Popup
        if (popup instanceof Popup) {
          popup.options.offset = this._height + arrowHeight;
        } else {
          popup.options.offset = {
            mainAxis: this._height + arrowHeight,
          };
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

  setDraggable(shouldBeDraggable?: boolean | undefined): this {
    Marker.prototype.setDraggable.apply(this, [shouldBeDraggable]);
    this._element.classList.toggle("draggable", shouldBeDraggable);
    return this;
  }
}
