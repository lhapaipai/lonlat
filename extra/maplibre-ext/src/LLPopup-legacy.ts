import { Popup } from "maplibre-gl";
import { DOM } from "maplibre-gl/src/util/dom";
import { smartWrap } from "maplibre-gl/src/util/smart_wrap";
import { anchorTranslate } from "maplibre-gl/src/ui/anchor";
import { applyAnchorClass, normalizeOffset } from "./lib/anchor";
import Point from "@mapbox/point-geometry";
import "./LLPopup.scss";

import "@lonlat/shared/components/dialog/Dialog.scss";
import "@lonlat/shared/components/button/Button.scss";

export default class LLPopup extends Popup {
  setText(text: string, title?: string): this {
    const description = DOM.create("div", "description");
    description.innerText = text;
    return this.setDOMContent(description, title);
  }

  setHTML(html: string, title?: string): this {
    const description = DOM.create("div", "description");
    const temp = document.createElement("body");
    let child;
    temp.innerHTML = html;
    while (true) {
      child = temp.firstChild;
      if (!child) break;
      description.appendChild(child);
    }

    return this.setDOMContent(description, title);
  }

  setDOMContent(htmlNode: Node, title?: string): this {
    if (this._content) {
      // Clear out children first.
      while (this._content.hasChildNodes()) {
        if (this._content.firstChild) {
          this._content.removeChild(this._content.firstChild);
        }
      }
    } else {
      this._content = DOM.create("div", "box", this._container);
    }

    // The close button should be the last tabbable element inside the popup for a good keyboard UX.
    this._createHeader(title);

    this._content.appendChild(htmlNode);

    this._update();
    this._focusFirstElement();
    return this;
  }

  _createHeader(title?: string) {
    if (title || this.options.closeButton) {
      const header = DOM.create("header", "header", this._content);
      if (title) {
        const h4 = DOM.create("h4", undefined, header);
        h4.innerText = title;
      }
      if (this.options.closeButton) {
        const actions = DOM.create("div", "actions", header);

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
    }
  }

  _update = (cursor?: Point) => {
    const hasPosition = this._lngLat || this._trackPointer;

    if (!this._map || !hasPosition || !this._content) {
      return;
    }

    if (!this._container) {
      this._container = DOM.create(
        "div",
        "ll-dialog type-primary maplibregl-popup",
        this._map.getContainer(),
      );
      this._tip = DOM.create("div", "maplibregl-popup-tip", this._container);
      this._container.appendChild(this._content);
      if (this.options.className) {
        for (const name of this.options.className.split(" ")) {
          this._container.classList.add(name);
        }
      }

      if (this._trackPointer) {
        this._container.classList.add("maplibregl-popup-track-pointer");
      }
    }

    if (this.options.maxWidth && this._container.style.maxWidth !== this.options.maxWidth) {
      this._container.style.maxWidth = this.options.maxWidth;
    }

    if (this._map.transform.renderWorldCopies && !this._trackPointer) {
      this._lngLat = smartWrap(this._lngLat, this._pos, this._map.transform);
    }

    if (this._trackPointer && !cursor) return;

    const pos = (this._pos =
      this._trackPointer && cursor ? cursor : this._map.project(this._lngLat));

    let anchor = this.options.anchor;
    const offset = normalizeOffset(this.options.offset);

    if (!anchor) {
      const width = this._container.offsetWidth;
      const height = this._container.offsetHeight;
      let anchorComponents;

      if (pos.y + offset.bottom.y < height) {
        anchorComponents = ["top"];
      } else if (pos.y > this._map.transform.height - height) {
        anchorComponents = ["bottom"];
      } else {
        anchorComponents = [];
      }

      if (pos.x < width / 2) {
        anchorComponents.push("left");
      } else if (pos.x > this._map.transform.width - width / 2) {
        anchorComponents.push("right");
      }

      if (anchorComponents.length === 0) {
        anchor = "bottom";
      } else {
        anchor = anchorComponents.join("-") as any;
      }
    }

    const offsetedPos = pos.add(offset[anchor]).round();
    DOM.setTransform(
      this._container,
      `${anchorTranslate[anchor]} translate(${offsetedPos.x}px,${offsetedPos.y}px)`,
    );
    applyAnchorClass(this._container, anchor, "popup");
  };
}
