import maplibregl, { MarkerOptions } from "maplibre-gl";
import { applyAnchorClass } from "maplibre-gl/src/ui/anchor";
import { extend } from "maplibre-gl/src/util/util";
import { DOM } from "maplibre-gl/src/util/dom";
import Point from "@mapbox/point-geometry";
import "./LLMarker.scss";

interface Options extends MarkerOptions {
  icon?: string;
}

export default class LLMarker extends maplibregl.Marker {
  _icon: string;

  constructor(options?: Options, legacyOptions?: MarkerOptions) {
    super();
    // For backward compatibility -- the constructor used to accept the element as a
    // required first argument, before it was made optional.
    if (options instanceof HTMLElement || legacyOptions) {
      options = extend({ element: options }, legacyOptions);
    }

    this._anchor = (options && options.anchor) || "bottom";
    this._icon = (options && options.icon) || "fe-star";
    this._color = (options && options.color) || "#3FB1CE";
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

    if (!options || !options.element) {
      this._defaultMarker = true;
      const defaultHeight = 50 * this._scale;

      this._element = DOM.create("div", "ll-marker");
      this._element.setAttribute("aria-label", "Map marker");
      this._element.style.setProperty("--marker-size", `${defaultHeight}px`);

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

    this._popup = null;
  }
}
