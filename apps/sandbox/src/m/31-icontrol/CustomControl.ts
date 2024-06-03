import { Evented, IControl, Map } from "maplibre-gl";
import { Event } from "maplibre-gl/src/util/evented";

/**
 * @event `mounted` - Fired when controler is added into the map
 */
export default class CustomControl extends Evented implements IControl {
  _map?: Map;
  _controlContainer?: HTMLElement;

  onAdd(map: Map) {
    this._map = map;
    this._controlContainer = document.createElement("div");
    this._controlContainer.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this._controlContainer.textContent = "Hello, world";

    this.fire(new Event("mounted"));

    return this._controlContainer;
  }

  onRemove() {
    this._controlContainer?.remove();
    this._map = undefined;
  }
}
