import { IControl, Map } from "maplibre-gl";
import { ReactElement, cloneElement, memo, useState } from "react";
import { createPortal } from "react-dom";
import { MapInstance, useControl } from "react-map-gl/maplibre";

/**
 * https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol
 * Interface pour les contrôles interactifs ajoutés à la carte. Il s'agit d'une
 * spécification à modéliser par les implémenteurs: il ne s'agit pas d'une méthode
 * ou d'une classe exportée.
 *
 * Les contrôles doivent implémenter onAdd et onRemove et doivent posséder un
 * élément, qui est souvent un élément div. Pour utiliser le style de contrôle par
 * défaut de Mapbox GL JS, ajoutez la classe mapboxgl-ctrl au nœud de votre contrôle.
 */
class OverlayControl implements IControl {
  _map: MapInstance | null = null;
  _container: HTMLElement | null = null;
  _redraw: () => void;

  constructor(redraw: () => void) {
    this._redraw = redraw;
  }

  onAdd(map: MapInstance): HTMLElement {
    this._map = map;
    map.on("move", this._redraw);

    this._container = document.createElement("div");
    this._redraw();
    return this._container;
  }

  onRemove(): void {
    this._container?.remove();
    this._map?.off("move", this._redraw);
    this._map = null;
  }

  getMap() {
    return this._map;
  }

  getElement() {
    if (!this._container) {
      throw new Error("must be called after added on the map");
    }
    return this._container;
  }
}

function CustomOverlay({ children }: { children: ReactElement }) {
  const [version, setVersion] = useState(0);
  console.log("render customOverlay", version);

  const ctrl = useControl(() => {
    const forceUpdate = () => {
      console.log("forceUpdate");
      setVersion((v) => v + 1);
    };

    return new OverlayControl(forceUpdate);
  });

  const map = ctrl.getMap();

  return map && createPortal(cloneElement(children, { map }), ctrl.getElement());
}

export default memo(CustomOverlay);
