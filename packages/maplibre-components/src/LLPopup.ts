import { Evented, LngLat, LngLatLike, Map, MapMouseEvent } from "maplibre-gl";
import { DOM } from "maplibre-gl/src/util/dom";
import { extend } from "maplibre-gl/src/util/util";
import Point from "@mapbox/point-geometry";
import { Event } from "maplibre-gl/src/util/evented";
import VirtualElement from "./lib/VirtualElement";

import "./LLPopup.scss";
import {
  OffsetOptions,
  Placement,
  Side,
  arrow,
  computePosition,
  flip,
  hide,
  limitShift,
  offset,
  shift,
} from "@floating-ui/dom";
import "@lonlat/shared/components/dialog/Dialog.scss";
import "@lonlat/shared/components/button/Button.scss";

export interface LLPopupOptions {
  closeButton?: boolean;
  closeOnClick?: boolean;
  closeOnMove?: boolean;
  placement?: Placement;
  offset?: OffsetOptions;
  className?: string;
  maxWidth?: string;
}

const defaultOptions = {
  closeButton: true,
  closeOnClick: true,
  closeOnMove: false,
  placement: "top",
  maxWidth: "240px",
};

export const arrowHeight = 6;

export default class LLPopup extends Evented {
  _map: Map | null = null;
  _lngLat: LngLat | null = null;
  _pos: Point | null = null;
  _virtualElement: VirtualElement;
  _trackPointer = false;
  options: LLPopupOptions;

  _container: HTMLElement | null = null;
  _box: HTMLElement | null = null;
  _arrow_bg: HTMLElement | null = null;
  _arrow_shadow: HTMLElement | null = null;
  _closeButton: HTMLButtonElement | null = null;

  constructor(options?: LLPopupOptions) {
    super();
    this.options = extend(Object.create(defaultOptions), options);
    this._virtualElement = new VirtualElement();
  }

  isOpen() {
    return !!this._map;
  }

  getElement() {
    return this._container;
  }

  remove = (): this => {
    if (this._container) {
      DOM.remove(this._container);
      this._container = null;
    }
    if (this._map) {
      this._map.off("move", this._onClose);
      this._map.off("click", this._onClose);
      this._map.off("remove", this.remove);
      this._removePositionListeners();

      this._map = null;
    }

    this.fire(new Event("close"));

    return this;
  };

  getLngLat() {
    return this._lngLat;
  }

  addTo(map: Map): this {
    if (this._map) this.remove();

    this._map = map;
    if (this.options.closeOnClick) {
      this._map.on("click", this._onClose);
    }
    if (this.options.closeOnMove) {
      this._map.on("move", this._onClose);
    }

    this._map.on("remove", this.remove);

    this._refreshPositionListeners();
    this._update();

    this.fire(new Event("open"));

    return this;
  }

  _removePositionListeners() {
    if (!this._map) {
      return;
    }
    this._map.off("move", this._update);
    this._map.off("mousemove", this._onMouseMove);
    this._map.off("mouseup", this._onMouseUp);
  }

  _refreshPositionListeners() {
    if (!this._map) {
      return;
    }
    this._removePositionListeners();

    if (this._trackPointer) {
      this._map.on("mousemove", this._onMouseMove);
      this._map.on("mouseup", this._onMouseUp);
    } else {
      this._map.on("move", this._update);
    }

    this._container?.classList.toggle("unselectable", this._trackPointer);
  }

  setLngLat(lnglat: LngLatLike): this {
    this._lngLat = LngLat.convert(lnglat);
    this._pos = null;

    this._refreshPositionListeners();
    this._update();

    return this;
  }

  trackPointer(): this {
    this._trackPointer = true;
    this._pos = null;

    this._refreshPositionListeners();
    this._update();

    return this;
  }

  setHTML(html: string, title?: string): this {
    const description = DOM.create("div", "description");
    const temp = document.createElement("body");
    let child;
    temp.innerHTML = html;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      child = temp.firstChild;
      if (!child) break;
      description.appendChild(child);
    }

    return this.setDOMContent(description, title);
  }

  getMaxWidth() {
    return this._container?.style.maxWidth;
  }

  setMaxWidth(maxWidth: string): this {
    this.options.maxWidth = maxWidth;
    this._update();
    return this;
  }

  setDOMContent(htmlNode: Node, title?: string): this {
    if (this._box) {
      // Clear out children first.
      while (this._box.hasChildNodes()) {
        if (this._box.firstChild) {
          this._box.removeChild(this._box.firstChild);
        }
      }
    } else {
      this._box = DOM.create("div", "box");
    }

    this._createHeader(title);

    this._box.appendChild(htmlNode);

    this._update();

    return this;
  }

  _onMouseUp = (event: MapMouseEvent) => {
    this._update(event.point);
  };

  _onMouseMove = (event: MapMouseEvent) => {
    this._update(event.point);
  };

  _update = (cursorPosition?: Point) => {
    const hasReference = this._lngLat || this._trackPointer;

    if (!this._map || !hasReference || !this._box) {
      return;
    }

    if (!this._container) {
      this._container = DOM.create(
        "div",
        "ll-popup ll-dialog type-primary placement-top",
        this._map.getContainer(),
      );

      if (this.options.className) {
        for (const name of this.options.className.split(" ")) {
          this._container.classList.add(name);
        }
      }
      this._container.appendChild(this._box);
      this._arrow_bg = DOM.create("div", "arrow arrow-bg", this._container);
      this._arrow_shadow = DOM.create("div", "arrow arrow-shadow", this._container);
    }

    if (this.options.maxWidth && this._container.style.maxWidth !== this.options.maxWidth) {
      this._container.style.maxWidth = this.options.maxWidth;
    }

    if (this._trackPointer && !cursorPosition) return;

    const pos = (this._pos =
      this._trackPointer && cursorPosition ? cursorPosition : this._map.project(this._lngLat!));
    this._virtualElement.setCoords(pos.x, pos.y);
    computePosition(this._virtualElement, this._container, {
      placement: this.options.placement,
      middleware: [
        offset(this.options.offset || arrowHeight),
        flip({
          mainAxis: !this.options.offset,
        }),
        shift({
          padding: arrowHeight,
          limiter: limitShift({
            offset: 15,
          }),
        }),
        arrow({
          element: this._arrow_shadow!,
          padding: 8,
        }),
        hide(),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      this._container!.style.transform = `translate(${x}px, ${y}px)`;

      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const currentSide = placement.split("-")[0] as Side;
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[currentSide];

      ["top", "right", "bottom", "left"].forEach(
        (side) => this._container?.classList.remove(`placement-${side}`),
      );
      this._container?.classList.add(`placement-${currentSide}`);

      const arrowStyle = {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-6px",
      };
      Object.assign(this._arrow_bg!.style, arrowStyle);
      Object.assign(this._arrow_shadow!.style, arrowStyle);
    });
  };

  _createHeader(title?: string) {
    if (!this._box) {
      throw new Error("_createHeader must be called after setDOMContent");
    }
    if (this.options.closeButton) {
      const actions = DOM.create("div", "bar-buttons", this._box);

      this._closeButton = DOM.create(
        "button",
        "ll-button icon shape-ghost-weak button-weak shape-ghost",
        actions,
      );
      this._closeButton.type = "button";
      this._closeButton.setAttribute("aria-label", "Close popup");
      DOM.create("i", "fe-cancel", this._closeButton);
      this._closeButton.addEventListener("click", this._onClose);
    }
    if (title) {
      const header = DOM.create("header", "header", this._box);
      const h4 = DOM.create("h4", undefined, header);
      h4.innerText = title;
    }
  }

  _onClose = () => {
    this.remove();
  };
}
