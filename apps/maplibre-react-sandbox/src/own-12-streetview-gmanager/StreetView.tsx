import { useEventCallback } from "pentatrion-design";
import { GManager } from "./GManager";
import { CSSProperties, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { LngLatObj, areLngLatClose, getLngLatObj } from "maplibre-react-components";

interface Props {
  heading: number;
  pitch: number;
  coords: { lng: number; lat: number };
  setVisible: Dispatch<SetStateAction<boolean>>;
  setHeading: Dispatch<SetStateAction<number>>;
  setPitch: Dispatch<SetStateAction<number>>;
  setCoords: Dispatch<SetStateAction<{ lng: number; lat: number }>>;
}

function latLngStr(lngLat: { lng: number; lat: number }) {
  return `(${lngLat.lat}, ${lngLat.lng})`;
}

const eltStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

// https://developers.google.com/maps/documentation/javascript/streetview?hl=fr
export default function StreetView({
  heading,
  pitch,
  coords,
  setHeading,
  setPitch,
  setCoords,
  setVisible,
}: Props) {
  const eltRef = useRef<HTMLDivElement>(null!);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);

  useEffect(() => {
    const gPov = panoramaRef.current?.getPov();
    if (!gPov || gPov.heading !== heading || gPov.pitch !== pitch) {
      console.log("useEffect setPov", panoramaRef.current?.getPov(), { heading, pitch });
      panoramaRef.current?.setPov({ heading, pitch });
    }
  }, [heading, pitch]);

  useEffect(() => {
    const gLngLat = getLngLatObj(panoramaRef.current?.getPosition());
    if (gLngLat && !areLngLatClose(gLngLat, coords)) {
      console.log("useEffect coords. gLngLat:", latLngStr(gLngLat), "coords: ", latLngStr(coords));
      // submit a new position to google streetview
      // will normally relaunch a "pano_changed" with a position closest to the snapshots
      panoramaRef.current?.setPosition(coords);
    }
  }, [coords]);

  const handlePosChangedStable = useEventCallback((gLngLat: LngLatObj) => {
    console.log("handlePanoChanged");

    if (!areLngLatClose(gLngLat, coords)) {
      console.log("pano_changed gLngLat:", latLngStr(gLngLat), "coords: ", latLngStr(coords));
      setCoords(gLngLat);
    }
  });

  const handlePovChangedStable = useEventCallback((pov: google.maps.StreetViewPov) => {
    console.log("handlePovChanged");

    // pegman changes heading position every 22.5 deg we do not need
    // to fire a heading event as soon as the position changes by 1deg
    // actually no change for the pitch
    if (Math.round(pov.heading * 0.2) !== Math.round(heading * 0.2)) {
      console.log("pov_changed gPov:", pov, "current:", heading, pitch);
      setHeading(pov.heading);
      setPitch(pov.pitch);
    }
  });

  const handleVisibleChangedStable = useEventCallback((isVisible) => {
    console.log("visible_changed", isVisible);
    if (isVisible === false) {
      setVisible(false);
    }
  });

  useEffect(() => {
    if (panoramaRef.current) {
      return;
    }

    const streetViewContainer = eltRef.current;

    const street = GManager.createOrGetPanorama(
      streetViewContainer,
      coords,
      { pitch, heading },
      {
        handlePosChanged: handlePosChangedStable,
        handlePovChanged: handlePovChangedStable,
        handleVisibleChanged: handleVisibleChangedStable,
      },
    );

    console.log("street", street);

    panoramaRef.current = street;

    return () => {
      GManager.hidePanorama();
      panoramaRef.current = null;
    };
  }, []);

  return <div id="street-view" ref={eltRef} style={eltStyle}></div>;
}
