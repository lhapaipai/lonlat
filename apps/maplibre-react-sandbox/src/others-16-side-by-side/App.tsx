import "./App.scss";
import { Map, ViewStateChangeEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import ControlPanel, { Mode } from "./ControlPanel";
import { CSSProperties, useCallback, useMemo, useState } from "react";

//"https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
//"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
//"/styles/ign/PLAN.IGN/standard.json"
const marignier = { lng: 6.498, lat: 46.089 };

const marignierViewState = {
  longitude: marignier.lng,
  latitude: marignier.lat,
  zoom: 16,
};

const LeftMapStyle: CSSProperties = {
  position: "absolute",
  width: "50%",
  height: "100%",
};
const RightMapStyle: CSSProperties = {
  position: "absolute",
  left: "50%",
  width: "50%",
  height: "100%",
};

function App() {
  const [viewState, setViewState] = useState(marignierViewState);

  const [mode, setMode] = useState<Mode>("side-by-side");

  const [activeMap, setActiveMap] = useState<"left" | "right">("left");

  const onLeftMoveStart = useCallback(() => setActiveMap("left"), []);
  const onRightMoveStart = useCallback(() => setActiveMap("right"), []);
  const onMove = useCallback(
    (evt: ViewStateChangeEvent, side: "left" | "right") => {
      if (activeMap === side) {
        setViewState(evt.viewState);
      }
    },
    [activeMap],
  );
  const width = typeof window === "undefined" ? 100 : window.innerWidth;
  const leftMapPadding = useMemo(() => {
    return {
      left: mode === "split-screen" ? width / 2 : 0,
      top: 0,
    };
  }, [width, mode]);
  const rightMapPadding = useMemo(() => {
    return {
      top: 0,
      right: mode === "split-screen" ? width / 2 : 0,
    };
  }, [width, mode]);
  return (
    <>
      <RMap
        id="left-map"
        {...viewState}
        padding={leftMapPadding}
        onMoveStart={onLeftMoveStart}
        onMove={(e) => onMove(e, "left")}
        mapStyle="/styles/ign/PLAN.IGN/standard.json"
        style={LeftMapStyle}
      ></RMap>
      <RMap
        id="right-map"
        {...viewState}
        padding={rightMapPadding}
        onMoveStart={onRightMoveStart}
        onMove={(e) => onMove(e, "right")}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
        style={RightMapStyle}
      ></RMap>

      <ControlPanel mode={mode} onModeChange={setMode} />
    </>
  );
}

export default App;
