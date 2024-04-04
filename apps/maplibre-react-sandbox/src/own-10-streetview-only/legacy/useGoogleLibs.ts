import { Loader } from "@googlemaps/js-api-loader";
import { useRef, useState } from "react";
import { googleMapsApiToken } from "../shared/constants";

export default function useGoogleLibs() {
  const [libs, setLibs] = useState<{
    Map: typeof google.maps.Map;
    StreetViewPanorama: typeof google.maps.StreetViewPanorama;
  } | null>(null);
  const loading = useRef(false);

  if (libs) {
    return libs;
  }

  if (loading.current) {
    return null;
  }
  const loader = new Loader({
    apiKey: googleMapsApiToken,
    version: "weekly",
    libraries: ["maps", "streetView"],
  });
  Promise.all([loader.importLibrary("maps"), loader.importLibrary("streetView")]).then(
    ([libMaps, libStreetView]) => {
      setLibs({
        Map: libMaps.Map,
        StreetViewPanorama: libStreetView.StreetViewPanorama,
      });
    },
  );
  return null;
}
