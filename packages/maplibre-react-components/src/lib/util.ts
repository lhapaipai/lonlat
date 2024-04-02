import { MapOptions, Offset, PointLike } from "maplibre-gl";
import {
  type MapCallbacks,
  type MapHandlerOptionName,
  type MapHandlerOptions,
  type MapInitialOptionName,
  type MapReactiveOptionName,
  type MapReactiveOptions,
  type MapProps,
  mapReactiveOptionNames,
  mapHandlerNames,
} from "./MapManager";

type OtherOptions = Omit<
  MapOptions,
  | MapReactiveOptionName
  | keyof MapCallbacks
  | MapInitialOptionName
  | MapHandlerOptionName
  | "container"
  | "style"
>;

export function filterMapProps(options: MapProps) {
  const callbacks = {};
  const mapHandlerOptions = {};
  const mapReactiveOptions = {};
  const otherOptions = {};
  for (const key in options) {
    if (key.startsWith("on")) {
      callbacks[key] = options[key];
    } else if (key in mapHandlerNames) {
      mapHandlerOptions[key] = options[key];
    } else if (key in mapReactiveOptionNames) {
      mapReactiveOptions[key] = options[key];
    } else if (!key.startsWith("initial") && key !== "container" && key !== "style") {
      otherOptions[key] = options[key];
    }
  }

  return [
    mapReactiveOptions as MapReactiveOptions,
    callbacks as MapCallbacks,
    mapHandlerOptions as MapHandlerOptions,
    otherOptions as OtherOptions, // vérifier
  ] as const;
}

export function transformPropsToOptions(options: { [k: string]: unknown }) {
  const callbacks = {};
  const mapOptions = {};
  for (const key in options) {
    if (key.startsWith("initial")) {
      mapOptions[key[7].toLowerCase() + key.substring(8)] = options[key];
    } else if (key.startsWith("on")) {
      callbacks[key] = options[key];
    } else {
      mapOptions[key] = options[key];
    }
  }
  return [mapOptions, callbacks] as const;
}

export function prepareEventDep(
  eventNameToCallback: { [k: string]: string },
  callbacks: { [eventName: string]: unknown },
) {
  const activeEvents = Object.keys(eventNameToCallback).filter(
    (eventName) => eventNameToCallback[eventName] in callbacks,
  );

  return activeEvents.sort();
}

/* eslint-disable complexity */
/**
 * from : react-map-gl/src/utils/deep-equal.ts
 * Compare any two objects
 * @param a
 * @param b
 * @returns true if the objects are deep equal
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else if (Array.isArray(b)) {
    return false;
  }
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export function arePointsEqual(a?: PointLike, b?: PointLike): boolean {
  const ax = Array.isArray(a) ? a[0] : a ? a.x : 0;
  const ay = Array.isArray(a) ? a[1] : a ? a.y : 0;
  const bx = Array.isArray(b) ? b[0] : b ? b.x : 0;
  const by = Array.isArray(b) ? b[1] : b ? b.y : 0;
  return ax === bx && ay === by;
}

export function updateClassNames(
  elt: HTMLElement,
  prevClassNames: string[],
  nextClassNames: string[],
) {
  prevClassNames.forEach((name) => {
    if (name !== "" && nextClassNames.indexOf(name) === -1) {
      elt.classList.remove(name);
    }
  });

  nextClassNames.forEach((name) => {
    if (name !== "" && prevClassNames.indexOf(name) === -1) {
      elt.classList.add(name);
    }
  });
}

export function updateListeners(
  prevEventTypes: string[],
  nextEventTypes: string[],
  onSubscribe: (eventName: string) => void,
  onUnsubscribe: (eventName: string) => void,
) {
  prevEventTypes.forEach((eventName) => {
    if (eventName !== "" && nextEventTypes.indexOf(eventName) === -1) {
      // console.log("unregister event listener on", eventName);
      onUnsubscribe(eventName);
    }
  });

  nextEventTypes.forEach((eventName) => {
    if (eventName !== "" && prevEventTypes.indexOf(eventName) === -1) {
      // console.log("register event listener on", eventName);
      onSubscribe(eventName);
    }
  });
}

const markerHeight = 41 - 5.8 / 2;
const markerRadius = 13.5;
const linearOffset = Math.abs(markerRadius) / Math.SQRT2;

export const markerPopupOffset = {
  top: [0, 0],
  "top-left": [0, 0],
  "top-right": [0, 0],
  bottom: [0, -markerHeight],
  "bottom-left": [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
  "bottom-right": [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
  left: [markerRadius, (markerHeight - markerRadius) * -1],
  right: [-markerRadius, (markerHeight - markerRadius) * -1],
} as Offset;
