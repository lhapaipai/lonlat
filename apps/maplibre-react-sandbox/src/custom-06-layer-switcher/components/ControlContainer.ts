import { IControl, MapInstance } from "react-map-gl/maplibre";

export default class ControlContainer implements IControl {
  _map: MapInstance | null = null;
  _container: HTMLElement | null = null;
  // _redraw: () => void;
  // _extraClass?: string

  constructor(
    private redraw: () => void,
    private extraClass?: string,
  ) {}

  onAdd(map: MapInstance): HTMLElement {
    this._map = map;
    this._container = document.createElement("div");
    this._container.classList.add("maplibregl-ctrl");
    this.extraClass && this._container.classList.add(this.extraClass);
    this.redraw();
    return this._container;
  }
  onRemove(): void {
    this._container?.remove();
    this._map = null;
  }
  getDefaultPosition() {
    return "bottom-left";
  }
  getElement() {
    if (!this._container) {
      throw new Error("must be called after added on the map");
    }
    return this._container;
  }
  getMap() {
    return this._map;
  }
}
