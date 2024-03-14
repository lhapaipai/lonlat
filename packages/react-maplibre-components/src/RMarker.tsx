import { useEffect, useRef } from "react";
import useMapContext from "./useMapContext";
import { MarkerOptions, LngLatLike } from "maplibre-gl";

import { LLMarker } from "maplibre-components";

interface Props extends MarkerOptions {
  lnglat: LngLatLike;
  icon?: string;
  onChangeLngLat?: (e?: LngLatLike) => void;
}

export default function RMarker({
  lnglat,
  color,
  draggable,
  scale,
  onChangeLngLat = () => {},
  ...nonReactiveMarkerOptions
}: Props) {
  const map = useMapContext();
  const marker = useRef<LLMarker | null>(null);

  /* Must be first useEffect */
  useEffect(() => {
    if (marker.current === null) {
      marker.current = new LLMarker({
        color,
        draggable,
        scale,
        ...nonReactiveMarkerOptions,
      })
        .setLngLat(lnglat)
        .addTo(map);
    }

    return () => {
      marker.current?.remove();
      marker.current = null;
    };
  }, []);

  useEffect(() => {
    marker.current?.setLngLat(lnglat);
  }, [lnglat]);

  useEffect(() => {
    marker.current?.setColor(color);
  }, [color]);

  useEffect(() => {
    function handleDragEnd() {
      onChangeLngLat(marker.current?.getLngLat());
    }

    marker.current?.setDraggable(draggable);
    console.log("useEffect draggable");
    draggable && marker.current?.on("dragend", handleDragEnd);

    return () => {
      draggable && marker.current?.off("dragend", handleDragEnd);
    };
  }, [draggable]);

  useEffect(() => {
    marker.current?.setScale(scale);
  }, [scale]);

  return <></>;
}
