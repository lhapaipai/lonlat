import { Position } from "geojson";

export function generateGMapsDirection(...lngLatPositions: Position[]) {
  console.log(lngLatPositions);
  const latLngStrs = lngLatPositions.map(([lng, lat]) => `${lat},${lng}`);
  if (lngLatPositions.length === 1) {
    return `https://www.google.com/maps/dir//${latLngStrs[0]}/`;
  } else {
    return `https://www.google.com/maps/dir/${latLngStrs.join("/")}/`;
  }
}

export function generateWazeDirection(lngLat: Position) {
  return `https://waze.com/ul?ll=${lngLat[1]},${lngLat[0]}&navigate=yes`;
}
