import Point from "@mapbox/point-geometry";
import { PositionAnchor } from "maplibre-gl";
import { anchorTranslate } from "maplibre-gl/src/ui/anchor";
import { type Offset } from "maplibre-gl/src/ui/popup";

export function normalizeOffset(offset?: Offset | null) {
  if (!offset) {
    return normalizeOffset(new Point(0, 0));
  } else if (typeof offset === "number") {
    // input specifies a radius from which to calculate offsets at all positions
    const cornerOffset = Math.round(Math.sqrt(0.5 * Math.pow(offset, 2)));
    return {
      center: new Point(0, 0),
      top: new Point(0, offset),
      "top-left": new Point(cornerOffset, cornerOffset),
      "top-right": new Point(-cornerOffset, cornerOffset),
      bottom: new Point(0, -offset),
      "bottom-left": new Point(cornerOffset, -cornerOffset),
      "bottom-right": new Point(-cornerOffset, -cornerOffset),
      left: new Point(offset, 0),
      right: new Point(-offset, 0),
    };
  } else if (offset instanceof Point || Array.isArray(offset)) {
    // input specifies a single offset to be applied to all positions
    const convertedOffset = Point.convert(offset);
    return {
      center: convertedOffset,
      top: convertedOffset,
      "top-left": convertedOffset,
      "top-right": convertedOffset,
      bottom: convertedOffset,
      "bottom-left": convertedOffset,
      "bottom-right": convertedOffset,
      left: convertedOffset,
      right: convertedOffset,
    };
  } else {
    // input specifies an offset per position
    return {
      center: Point.convert(offset["center"] || [0, 0]),
      top: Point.convert(offset["top"] || [0, 0]),
      "top-left": Point.convert(offset["top-left"] || [0, 0]),
      "top-right": Point.convert(offset["top-right"] || [0, 0]),
      bottom: Point.convert(offset["bottom"] || [0, 0]),
      "bottom-left": Point.convert(offset["bottom-left"] || [0, 0]),
      "bottom-right": Point.convert(offset["bottom-right"] || [0, 0]),
      left: Point.convert(offset["left"] || [0, 0]),
      right: Point.convert(offset["right"] || [0, 0]),
    };
  }
}

export const anchorToPlacement = {
  center: "center",
  bottom: "top",
  top: "bottom",
  right: "left",
  left: "right",
  "bottom-right": "top-start",
  "bottom-left": "top-end",
  "top-right": "bottom-start",
  "top-left": "bottom-end",
  "right-right": "left-start",
  "right-left": "left-end",
  "left-right": "right-start",
  "left-left": "right-end",
};

export function applyAnchorClass(element: HTMLElement, anchor: PositionAnchor, prefix: string) {
  const classList = element.classList;
  for (const key in anchorTranslate) {
    classList.remove(`maplibregl-${prefix}-anchor-${key}`);
    classList.remove(`placement-${anchorToPlacement[key as keyof typeof anchorToPlacement]}`);
  }
  classList.add(`maplibregl-${prefix}-anchor-${anchor}`);
  classList.add(`placement-${anchorToPlacement[anchor]}`);
}
