import { Position } from "geojson";

export function epsg3857to4326([lon3857, lat3857, ...rest]: Position) {
  const X = 20037508.34;

  const long4326 = (lon3857 * 180) / X;

  let lat4326 = lat3857 / (X / 180);
  const exponent = (Math.PI / 180) * lat4326;

  lat4326 = Math.atan(Math.exp(exponent));
  lat4326 = lat4326 / (Math.PI / 360); // Here is the fixed line
  lat4326 = lat4326 - 90;

  return [long4326, lat4326, ...rest];
}
