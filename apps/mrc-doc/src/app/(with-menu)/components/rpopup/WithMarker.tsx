"use client";

import {
  RMap,
  RMarker,
  RPopup,
  markerPopupOffset,
} from "maplibre-react-components";
import { useState } from "react";
import { mapCSS } from "~/lib/map-util";

const center: [number, number] = [4.8, 45.7];

export default function App() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <RMap
      className="maplibregl-theme-modern"
      initialCenter={center}
      initialZoom={2}
      initialAttributionControl={false}
      style={mapCSS}
    >
      <RMarker
        longitude={center[0]}
        latitude={center[1]}
        onClick={(e) => {
          e.stopPropagation();
          setShowPopup((s) => !s);
        }}
      />
      {showPopup && (
        <RPopup
          longitude={center[0]}
          latitude={center[1]}
          onMapClick={() => setShowPopup(false)}
          onMapMove={() => setShowPopup(false)}
          offset={markerPopupOffset}
        >
          Hello Lyon !
        </RPopup>
      )}
    </RMap>
  );
}
