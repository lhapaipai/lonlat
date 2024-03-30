import { MapOptions } from "maplibre-gl";
import {
  MapCallbacks,
  MapHandlerOptionName,
  MapHandlerOptions,
  MapInitialOptionName,
  MapInitialOptions,
  MapReactiveOptionName,
  MapReactiveOptions,
  mapHandlerNames,
  mapReactiveOptionNames,
} from "../lib/MapManager";
import { MapProps } from "./MapManager";

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

export function prepareInitialOptions(
  options: MapInitialOptions & MapReactiveOptions & MapHandlerOptions & MapCallbacks,
) {
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
  return [
    mapOptions as Omit<MapOptions, "style" | "container">,
    callbacks as MapCallbacks,
  ] as const;
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
      if (!b.hasOwnProperty(key)) {
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
