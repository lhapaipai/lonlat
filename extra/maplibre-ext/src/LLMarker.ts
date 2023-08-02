import { Map, MapMouseEvent, MapTouchEvent, Marker, MarkerOptions } from "maplibre-gl";
import { applyAnchorClass, anchorTranslate } from "maplibre-gl/src/ui/anchor";
import { extend } from "maplibre-gl/src/util/util";
import { DOM } from "maplibre-gl/src/util/dom";
import Point from "@mapbox/point-geometry";
import "./LLMarker.scss";
import { arrowHeight } from "./LLPopup";

interface Options extends MarkerOptions {
  icon?: string;
}

const defaultColor = "#ffe64b";
const defaultHeight = 50;

export default class LLMarker extends Marker {
  _icon: string;
  _height = defaultHeight;

  constructor(options?: Options) {
    super(options);

    this._anchor = (options && options.anchor) || "bottom";
    this._color = (options && options.color) || defaultColor;
    this._scale = (options && options.scale) || 1;
    this._draggable = (options && options.draggable) || false;
    this._clickTolerance = (options && options.clickTolerance) || 0;
    this._isDragging = false;
    this._state = "inactive";
    this._rotation = (options && options.rotation) || 0;
    this._rotationAlignment = (options && options.rotationAlignment) || "auto";
    this._pitchAlignment =
      options && options.pitchAlignment && options.pitchAlignment !== "auto"
        ? options.pitchAlignment
        : this._rotationAlignment;

    this._icon = (options && options.icon) || "fe-star";

    if (!options || !options.element) {
      this._defaultMarker = true;

      this._element = DOM.create("div", "ll-marker");
      this._element.setAttribute("aria-label", "Map marker");
      this._element.setAttribute("tabindex", "0");

      this.setScale(this._scale);
      this.setColor(this._color);

      const container = DOM.create("div");
      DOM.create("div", "ovale", container);
      DOM.create("i", this._icon, container);

      this._element.appendChild(container);
    } else {
      this._element = options.element;
    }

    this._offset = Point.convert((options && options.offset) || [0, 0]);

    this._element.classList.add("maplibregl-marker");
    this._element.addEventListener("dragstart", (e: DragEvent) => {
      e.preventDefault();
    });
    this._element.addEventListener("mousedown", (e: MouseEvent) => {
      // prevent focusing on click
      e.preventDefault();
    });
    applyAnchorClass(this._element, this._anchor, "marker");

    if (options && options.className) {
      for (const name of options.className.split(" ")) {
        this._element.classList.add(name);
      }
    }

    this._popup = null;
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

  setPopup(popup?: Popup | null): this {
    if (this._popup) {
      this._popup.remove();
      this._popup = null;
      this._element.removeEventListener("keypress", this._onKeyPress);

      if (!this._originalTabIndex) {
        this._element.removeAttribute("tabindex");
      }
    }

    if (popup) {
      if (!("offset" in popup.options)) {
        popup.options.offset = {
          mainAxis: this._height + arrowHeight + 5,
        };
      }

      this._popup = popup;
      if (this._lngLat) this._popup.setLngLat(this._lngLat);

      this._originalTabIndex = this._element.getAttribute("tabindex");
      if (!this._originalTabIndex) {
        this._element.setAttribute("tabindex", "0");
      }
      this._element.addEventListener("keypress", this._onKeyPress);
    }

    return this;
  }
}
