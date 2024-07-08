/*
 (c) 2017, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
*/

/**
 * Modifications from original script
 * add TypeScript types
 * remove highestQuality. the difference is too small to interest us especially since when we want the best quality we can use the original layout
 * search/replace `.x` and `.y` to `[0]` / `[1]`
 */

import { Position } from "geojson";

// to suit your point format, run search/replace for '.x' and '.y';
// for 3D version, see 3d branch (configurability would draw significant performance overhead)

// square distance from a point to a segment
function getSqSegDist(p: Position, p1: Position, p2: Position) {
  let x = p1[0],
    y = p1[1],
    dx = p2[0] - x,
    dy = p2[1] - y;

  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = p[0] - x;
  dy = p[1] - y;

  return dx * dx + dy * dy;
}
// rest of the code doesn't care about point format

function simplifyDPStep(
  points: Position[],
  first: number,
  last: number,
  sqTolerance: number,
  simplified: Position[],
) {
  let maxSqDist = sqTolerance,
    index;

  for (let i = first + 1; i < last; i++) {
    const sqDist = getSqSegDist(points[i], points[first], points[last]);

    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }

  if (maxSqDist > sqTolerance && index) {
    if (index - first > 1)
      simplifyDPStep(points, first, index, sqTolerance, simplified);
    simplified.push(points[index]);
    if (last - index > 1)
      simplifyDPStep(points, index, last, sqTolerance, simplified);
  }
}

// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker(points: Position[], sqTolerance: number) {
  const last = points.length - 1;

  const simplified = [points[0]];
  simplifyDPStep(points, 0, last, sqTolerance, simplified);
  simplified.push(points[last]);

  return simplified;
}

// both algorithms combined for awesome performance
export function simplifyCoords(points: Position[], tolerance?: number) {
  if (points.length <= 2) return points;

  const sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

  points = simplifyDouglasPeucker(points, sqTolerance);

  return points;
}
