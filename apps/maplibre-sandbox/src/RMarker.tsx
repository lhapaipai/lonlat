import { useEffect, useRef } from "react";
import useMapContext from "./useMapContext";
import * as maplibre from "maplibre-gl";

interface Props {
  lnglat: maplibre.LngLatLike;
}

export default function RMarker({ lnglat }: Props) {
  const map = useMapContext();
  const marker = useRef<maplibre.Marker | null>(null);

  useEffect(() => {
    if (marker.current === null) {
      marker.current = new maplibre.Marker().setLngLat(lnglat).addTo(map);
      console.log("addMarker");
    }

    console.log("update marker lnglat", lnglat);
    marker.current.setLngLat(lnglat);
  }, [map, lnglat]);

  useEffect(() => {
    return () => {
      console.log("removeMarker");

      marker.current?.remove();
      marker.current = null;
    };
  }, []);

  return <></>;
}
