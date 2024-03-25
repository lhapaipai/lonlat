import "./App.scss";
import { FullscreenControl, Map, Marker, Popup, ScaleControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import ControlPanel from "./ControlPanel";
import citiesData from "./cities.json";
import NavigationControl from "./lib/NavigationControl";
import { useMemo, useState } from "react";

const citiesInfo = citiesData as CityInfo[];

interface CityInfo {
  city: string;
  population: string;
  image: string;
  state: string;
  latitude: number;
  longitude: number;
}
const usaViewState = {
  longitude: -100,
  latitude: 40,
  zoom: 3.5,
};
function App() {
  const [popupInfo, setPopupInfo] = useState<CityInfo | null>(null);

  const pins = useMemo(
    () =>
      citiesInfo.map((info, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={info.longitude}
          latitude={info.latitude}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(info);
          }}
        ></Marker>
      )),
    [],
  );

  return (
    <>
      <Map
        initialViewState={usaViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            onClose={() => setPopupInfo(null)}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
      <ControlPanel />
    </>
  );
}

export default App;
