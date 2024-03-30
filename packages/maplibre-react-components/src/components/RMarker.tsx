import { Marker, MarkerOptions, Popup } from "maplibre-gl";
import { Event } from "maplibre-gl/src/util/evented";
import { ReactNode, forwardRef } from "react";

type RMarkerProps = MarkerOptions & {
  longitude: number;
  latitude: number;
  // popup?: Popup;

  onDragStart?: (e: Event) => void;
  onDrag?: (e: Event) => void;
  onDragEnd?: (e: Event) => void;
  // onClick?: (e) => void;
  children?: ReactNode;
};

const RMarker = forwardRef<Marker, RMarkerProps>((props, ref) => {
  return null;
});

export default RMarker;
