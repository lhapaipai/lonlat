import { ControlPosition, IControl, Map } from "maplibre-gl";
import { DOM } from "maplibre-gl/src/util/dom";

type LogoControlOptions = {
  compact?: boolean;
};

export default class LogoControl implements IControl {
  options: LogoControlOptions;
  _map!: Map;
  _compact?: boolean;
  _container!: HTMLElement;

  constructor(options: LogoControlOptions = {}) {
    this.options = options;
  }

  getDefaultPosition(): ControlPosition {
    return "bottom-left";
  }

  /** {@inheritdoc IControl.onAdd} */
  onAdd(map: Map): HTMLElement {
    this._map = map;
    this._compact = this.options && this.options.compact;
    this._container = DOM.create("div", "maplibregl-ctrl");
    const anchor = DOM.create("a", "maplibregl-ctrl-logo");
    anchor.target = "_blank";
    anchor.rel = "noopener nofollow";
    anchor.href = "https://maplibre.org/";
    anchor.setAttribute("aria-label", this._map._getUIString("LogoControl.Title"));
    anchor.setAttribute("rel", "noopener nofollow");
    this._container.appendChild(anchor);
    this._container.style.display = "block";

    this._map.on("resize", this._updateCompact);
    this._updateCompact();

    return this._container;
  }

  onRemove() {
    this._container && DOM.remove(this._container);
    this._map.off("resize", this._updateCompact);
  }

  _updateCompact = () => {
    const containerChildren = this._container.children;
    if (containerChildren.length) {
      const anchor = containerChildren[0];
      if (this._map.getCanvasContainer().offsetWidth <= 640 || this._compact) {
        if (this._compact !== false) {
          anchor.classList.add("maplibregl-compact");
        }
      } else {
        anchor.classList.remove("maplibregl-compact");
      }
    }
  };
}
