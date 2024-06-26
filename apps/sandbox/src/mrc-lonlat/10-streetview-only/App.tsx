import "./App.scss";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ResizeArea, useEventCallback } from "pentatrion-design";
import GoogleApiWrapper from "./GoogleApiWrapper";
import { googleMapsApiToken, ignPlanStyleUrl } from "~/shared/constants";
import { Libraries } from "@googlemaps/js-api-loader";
import {
  Event,
  RLayer,
  RMap,
  RMarker,
  RSource,
  areLngLatClose,
  lngLatClassToObj,
} from "maplibre-react-components";
import { Pegman, RPegman, getLngLatObj } from "pentatrion-geo";

const initialHeading = 0;
const initialPitch = 30;
const googleLibraries: Libraries = ["maps", "streetView"];
interface Props {
  heading: number;
  pitch: number;
  coords: { lng: number; lat: number };
  setHeading: Dispatch<SetStateAction<number>>;
  setPitch: Dispatch<SetStateAction<number>>;
  setCoords: Dispatch<SetStateAction<{ lng: number; lat: number }>>;
}
const marignier = { lat: 46.0918, lng: 6.4988 };

export const googleStreetViewURLTiles = [
  "https://mts0.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts1.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts2.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
  "https://mts3.googleapis.com/vt?hl=en-US&lyrs=svv|cb_client:apiv3&style=40,18&x={x}&y={y}&z={z}",
];

function latLngStr(lngLat: { lng: number; lat: number }) {
  return `(${lngLat.lat}, ${lngLat.lng})`;
}

// https://developers.google.com/maps/documentation/javascript/streetview?hl=fr
function StreetViewAndMap({
  heading,
  pitch,
  coords,
  setHeading,
  setPitch,
  setCoords,
}: Props) {
  // console.log("render StreetViewAndMap", coords);

  const mapContainerRef = useRef<HTMLDivElement>(null!);
  const streetContainerRef = useRef<HTMLDivElement>(null!);

  const mapRef = useRef<google.maps.Map | null>(null);
  const streetRef = useRef<google.maps.StreetViewPanorama | null>(null);

  useEffect(() => {
    console.log("useEffect setPov", streetRef.current?.getPov(), {
      heading,
      pitch,
    });
    streetRef.current?.setPov({ heading, pitch });
  }, [heading, pitch]);

  useEffect(() => {
    const gLngLat = getLngLatObj(streetRef.current?.getPosition());
    if (gLngLat && !areLngLatClose(gLngLat, coords)) {
      console.log(
        "useEffect coords. gLngLat:",
        latLngStr(gLngLat),
        "coords: ",
        latLngStr(coords),
      );
      // submit a new position to google streetview
      // will normally relaunch a "pano_changed" with a position closest to the snapshots
      streetRef.current?.setPosition(coords);
    }
  }, [coords]);

  const handlePanoChangedStable = useEventCallback(() => {
    // we need timeout because google corrects the position of pegman to be located
    // closest to the area where photos were taken
    setTimeout(() => {
      const gLngLat = getLngLatObj(streetRef.current?.getPosition());
      if (!gLngLat) {
        return;
      }
      if (!areLngLatClose(gLngLat, coords)) {
        console.log(
          "pano_changed gLngLat:",
          latLngStr(gLngLat),
          "coords: ",
          latLngStr(coords),
        );
        setCoords(gLngLat);
      }
    }, 0);
  });

  const handlePovChangedStable = useEventCallback(() => {
    const pov = streetRef.current?.getPov();
    if (!pov) {
      return;
    }
    // pegman changes heading position every 22.5 deg we do not need
    // to fire a heading event as soon as the position changes by 1deg
    // actually no change for the pitch
    if (Math.round(pov.heading * 0.2) !== Math.round(heading * 0.2)) {
      console.log("pov_changed gPov:", pov, "current:", heading, pitch);
      setHeading(pov.heading);
      setPitch(pov.pitch);
    }
  });

  useEffect(() => {
    if (mapRef.current || streetRef.current) {
      return;
    }

    const streetViewContainer = streetContainerRef.current;
    const mapsContainer = mapContainerRef.current;

    const map = new google.maps.Map(mapsContainer, {
      center: coords,
      zoom: 14,
    });

    const street = new google.maps.StreetViewPanorama(streetViewContainer, {
      position: coords,
      pov: {
        heading: initialHeading,
        pitch: initialPitch,
      },

      addressControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
      },
      linksControl: false,
      panControl: false,
      enableCloseButton: false,
    });

    map.setStreetView(street);
    console.log("map", map, "street", street);

    /**
     * déclenché lorsqu'on a relaché la souris et que pegman est redéposé
     */
    street.addListener("pano_changed", handlePanoChangedStable);

    /**
     * quand on déplace pegman, à intervalle régulier l'événement `position_changed`
     * est déclenché. une sorte de onmousemove avec un debounce de .4s
     */
    // street.addListener("position_changed", () => {
    //   console.log("position_changed");
    // });

    street.addListener("pov_changed", handlePovChangedStable);

    mapRef.current = map;
    streetRef.current = street;

    return () => {
      google.maps.event.clearInstanceListeners(window);
      google.maps.event.clearInstanceListeners(document);

      mapsContainer && google.maps.event.clearInstanceListeners(mapsContainer);
      streetViewContainer &&
        google.maps.event.clearInstanceListeners(streetViewContainer);

      mapRef.current = null;
      streetRef.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container" id="maps-container">
        <div id="maps" ref={mapContainerRef}></div>
        <ResizeArea name="maps" position="right" />
      </div>
      <div className="container" id="pano-container">
        <div id="pano" ref={streetContainerRef}></div>
      </div>
    </>
  );
}

function App() {
  const [counter, setCounter] = useState(0);
  const [showStreetView, setShowStreetView] = useState(true);

  const [heading, setHeading] = useState(initialHeading);
  const [pitch, setPitch] = useState(initialPitch);
  const [coords, setCoords] = useState(marignier);
  // console.log("render App", coords);

  function handlePegmanDragEnd(e: Event<Pegman>) {
    setCoords(lngLatClassToObj(e.target.getLngLat()));
  }

  return (
    <div id="app">
      <div id="google">
        {showStreetView && (
          <GoogleApiWrapper
            apiKey={googleMapsApiToken}
            version="weekly"
            libraries={googleLibraries}
          >
            <StreetViewAndMap
              heading={heading}
              pitch={pitch}
              coords={coords}
              setHeading={setHeading}
              setPitch={setPitch}
              setCoords={setCoords}
            />
          </GoogleApiWrapper>
        )}
      </div>
      <div id="lonlat">
        <ResizeArea name="lonlat" position="top" />
        <div className="container" id="maplibre-container">
          <div id="maplibre">
            <RMap
              onClick={(e) => {
                console.log(e.lngLat);
              }}
              initialCenter={coords}
              initialZoom={14}
              mapStyle={ignPlanStyleUrl}
            >
              <RPegman
                longitude={coords.lng}
                latitude={coords.lat}
                bearing={heading}
                draggable={true}
                onDragEnd={handlePegmanDragEnd}
              />
              <RMarker longitude={coords.lng} latitude={coords.lat}>
                <div className="red-box"></div>
              </RMarker>

              <RSource
                id="streetview-raster"
                key="streetview-trace"
                type="raster"
                tiles={googleStreetViewURLTiles}
                tileSize={256}
              />
              <RLayer
                key="streetview-fill"
                id="streetview-fill"
                type="raster"
                source="streetview-raster"
              />
            </RMap>
          </div>
          <ResizeArea name="maplibre" position="right" />
        </div>
        <div className="container" id="extra-container">
          <div>
            <button onClick={() => setCounter((c) => c + 1)}>
              counter {counter}
            </button>
          </div>
          <div>
            <button onClick={() => setShowStreetView((s) => !s)}>
              {showStreetView ? "masquer streetview" : "afficher streetview"}
            </button>
          </div>
          <div>
            heading
            <input
              type="range"
              min={0}
              max={360}
              value={heading}
              onChange={(e) => setHeading(e.target.valueAsNumber)}
            />
            {heading} deg.
          </div>
          <div>
            pitch
            <input
              type="range"
              min={-90}
              max={90}
              value={pitch}
              onChange={(e) => setPitch(e.target.valueAsNumber)}
            />
            {pitch} deg.
          </div>
        </div>
      </div>
    </div>
  );
}

// function App1() {
//   const [show, setShow] = useState(false);
//   return show ? <App /> : <button onClick={() => setShow(true)}>show</button>;
// }

export default App;
