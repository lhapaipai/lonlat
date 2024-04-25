import { useEventCallback } from "pentatrion-design";
import GManager from "./GManager";
import { CSSProperties, useEffect, useRef } from "react";
import { areLngLatClose } from "maplibre-react-components";
import { LngLatObj } from "~geo";

import { LngLat } from "maplibre-gl";

interface Props {
  heading: number;
  pitch: number;
  coords: [number, number];
  onChangeVisible: (visible: boolean) => void;
  onChangePov: (pov: google.maps.StreetViewPov) => void;
  onChangeCoords: (lngLat: [number, number]) => void;
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
  onChangePov,
  onChangeCoords,
  onChangeVisible,
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
    const gLngLat = panoramaRef.current?.getPosition()?.toJSON();
    const lngLatCoords = LngLat.convert(coords);
    if (gLngLat && !areLngLatClose(gLngLat, lngLatCoords)) {
      console.log("useEffect gLngLat:", latLngStr(gLngLat), "coords: ", latLngStr(lngLatCoords));
      // submit a new position to google streetview
      // will normally relaunch a "pano_changed" with a position closest to the snapshots
      panoramaRef.current?.setPosition(lngLatCoords);
    }
  }, [coords]);

  const handlePosChangedStable = useEventCallback((gLngLat: LngLatObj) => {
    console.log("handlePanoChanged");
    const lngLatCoords = LngLat.convert(coords);

    if (!areLngLatClose(gLngLat, lngLatCoords)) {
      console.log("pano_changed gLngLat:", latLngStr(gLngLat), "coords: ", latLngStr(lngLatCoords));
      onChangeCoords([gLngLat.lng, gLngLat.lat]);
    }
  });

  const handlePovChangedStable = useEventCallback((pov: google.maps.StreetViewPov) => {
    console.log("handlePovChanged");

    // pegman changes heading position every 22.5 deg we do not need
    // to fire a heading event as soon as the position changes by 1deg
    // actually no change for the pitch
    if (Math.round(pov.heading * 0.2) !== Math.round(heading * 0.2)) {
      console.log("pov_changed gPov:", pov, "current:", heading, pitch);
      onChangePov({
        heading: pov.heading,
        pitch: pov.pitch,
      });
    }
  });

  const handleVisibleChangedStable = useEventCallback((isVisible) => {
    console.log("visible_changed", isVisible);
    if (isVisible === false) {
      onChangeVisible(false);
    }
  });

  useEffect(() => {
    if (panoramaRef.current) {
      return;
    }

    const streetViewContainer = eltRef.current;

    const street = GManager.createOrGetPanorama(
      streetViewContainer,
      {
        position: { lng: coords[0], lat: coords[1] },
        pov: { pitch, heading },
      },
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
    // we don't want panorama to reload on each coords, pitch, heading update
    // they're considered as initial value
    // update are managed in callbacks above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="street-view" ref={eltRef} style={eltStyle}></div>;
}
