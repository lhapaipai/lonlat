import { LngLatObj } from "../../types";

export interface GoogleLatLng {
  lat(): number;
  lng(): number;
}

export function getLngLatObj(position?: GoogleLatLng | null) {
  if (!position) {
    return null;
  }
  return { lng: position.lng(), lat: position.lat() };
}

export function arePositionLngLatEqual(
  position: GoogleLatLng,
  lngLat: LngLatObj,
): boolean {
  return position.lat() === lngLat.lat && position.lng() === lngLat.lng;
}
