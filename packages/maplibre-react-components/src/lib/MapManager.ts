import {
  Map,
  MapContextEvent,
  MapDataEvent,
  MapLibreEvent,
  MapLibreZoomEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapStyleImageMissingEvent,
  MapTerrainEvent,
  MapWheelEvent,
  PaddingOptions,
  StyleSpecification,
} from "maplibre-gl";
import { MapCallbacks, eventHandlers, mapEvents } from "../types/events";
import { MapLayerMouseEvent, MapLayerTouchEvent } from "react-map-gl";
import { filterMapProps, prepareInitialOptions } from "./util";
import {
  MapHandlerOptions,
  MapInitialOptions,
  MapReactiveOptions,
  handlerNames,
  reactiveOptionNames,
} from "../types/map";
import { deepEqual } from "maplibre-gl/src/util/util";

export type ManagerOptions = {
  mapStyle?: StyleSpecification | string;
  styleDiffing?: boolean;
  padding?: PaddingOptions;

  // terrain?: StyleSpecification["terrain"];
  // interactiveLayerIds?: string[];
};

export type MapProps = MapInitialOptions & MapReactiveOptions & MapHandlerOptions & MapCallbacks;

const DEFAULT_STYLE = "https://demotiles.maplibre.org/style.json";

export default class MapManager {
  reactiveOptions: Partial<MapReactiveOptions> = {};
  handlerOptions: Partial<MapHandlerOptions> = {};
  callbacks: Partial<MapCallbacks>;

  private _map: Map;

  padding?: PaddingOptions;
  mapStyle: string | StyleSpecification;

  constructor(
    { mapStyle = DEFAULT_STYLE, padding }: ManagerOptions,
    mapProps: MapProps,
    container: HTMLDivElement,
  ) {
    this.mapStyle = mapStyle;
    this.padding = padding;

    const [mapBaseOptions, callbacks] = prepareInitialOptions(mapProps);

    this.callbacks = callbacks;

    const mapOptions = {
      ...mapBaseOptions,
      container,
      style: mapStyle,
    };

    const map = new Map(mapOptions);

    if (padding) {
      map.setPadding(padding);
    }

    for (const key in callbacks) {
      const handlerName = key as keyof typeof eventHandlers;
      if (eventHandlers[handlerName]) {
        const type = eventHandlers[handlerName];
        map.on(type, this._onMapEvent);
      }
    }

    this._map = map;
  }

  setProps(
    { mapStyle = DEFAULT_STYLE, styleDiffing = true, padding }: ManagerOptions,
    mapProps: MapProps,
  ) {
    const [reactiveOptions, callbacks, handlerOptions, _] = filterMapProps(mapProps);

    this._updateCallbacks(callbacks);
    this._updateStyle(mapStyle, styleDiffing);
    this._updateSettings(reactiveOptions, { padding });
    this._updateHandlers(handlerOptions);
  }

  _updateStyle(nextStyle: StyleSpecification | string, styleDiffing: boolean) {
    const curStyle = this.mapStyle;

    if (nextStyle !== curStyle) {
      this.mapStyle = nextStyle;
      this._map.setStyle(nextStyle, {
        diff: styleDiffing,
      });
    }
  }

  _updateSettings(
    nextReactiveOptions: MapReactiveOptions,
    { padding }: { padding?: PaddingOptions },
  ) {
    const currReactiveOptions = this.reactiveOptions;
    this.reactiveOptions = nextReactiveOptions;

    for (const optionName of reactiveOptionNames) {
      if (
        optionName in nextReactiveOptions &&
        !deepEqual(currReactiveOptions[optionName], nextReactiveOptions[optionName])
      ) {
        const setterName = `set${optionName[0].toUpperCase()}${optionName.substring(1)}`;
        this._map[setterName](nextReactiveOptions[optionName]);
      }
    }

    if (padding && !deepEqual(this.padding, padding)) {
      this._map.setPadding(padding);
    }
    this.padding = padding;
  }

  _updateCallbacks(callbacks: MapCallbacks) {
    this.callbacks = callbacks;
  }

  _updateHandlers(nextHandlers: MapHandlerOptions) {
    const currHandlers = this.handlerOptions;
    this.handlerOptions = nextHandlers;

    for (const propName of handlerNames) {
      const nextValue = nextHandlers[propName] ?? true;
      const currValue = currHandlers[propName] ?? true;
      if (!deepEqual(nextValue, currValue)) {
        if (nextValue) {
          this._map[propName].enable(nextValue);
        } else {
          this._map[propName].disable();
        }
      }
    }
  }

  _onMapEvent = (
    e:
      | MapLayerMouseEvent
      | MapLayerTouchEvent
      | MapWheelEvent
      | MapLibreEvent
      | MapLibreZoomEvent
      | MapContextEvent
      | ErrorEvent
      | MapDataEvent
      | MapStyleDataEvent
      | MapSourceDataEvent
      | MapStyleImageMissingEvent
      | MapTerrainEvent,
  ) => {
    const eventType = e.type as keyof typeof mapEvents;
    if (this.callbacks[mapEvents[eventType]]) {
      this.callbacks[mapEvents[eventType]](e);
    } else if (e.type === "error") {
      console.error(e);
    } else {
      console.info("not managed event", e);
    }
  };

  get map() {
    return this._map;
  }

  destroy() {
    this._map.remove();
  }
}
