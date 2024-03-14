import { LngLatLike } from "maplibre-gl";
import useMapContext from "./useMapContext";
import { useEffect, useRef } from "react";

import { LLPopup } from "@lonlat/maplibre-ext";
import { LLPopupOptions } from "@lonlat/maplibre-ext/src/LLPopup";

interface Props extends LLPopupOptions {
  lnglat: LngLatLike;
  html: string;
}

export default function RPopup({ lnglat, html, ...nonReactivePopupOptions }: Props) {
  const map = useMapContext();
  const popup = useRef<LLPopup | null>(null);

  useEffect(() => {
    if (popup.current === null) {
      popup.current = new LLPopup({ ...nonReactivePopupOptions })
        .setLngLat(lnglat)
        .setHTML(html)
        .addTo(map);
    }

    return () => {
      popup.current?.remove();
      popup.current = null;
    };
  }, []);

  useEffect(() => {
    popup.current?.setLngLat(lnglat);
  }, [lnglat]);

  return <></>;
}
