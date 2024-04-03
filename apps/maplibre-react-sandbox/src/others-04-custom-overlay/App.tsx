import "./App.scss";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import ControlPanel from "./ControlPanel";
import CustomOverlay from "./CustomOverlay";
import jsonElectionData from "./us-election-2016.json";
import PieCharts from "./PieCharts";
import { CountyElectionData } from "./types";
import { mapTilerStreetsStyleUrl } from "../shared/constants";

const electionData = jsonElectionData as CountyElectionData[];

console.log(electionData);

const usViewState = {
  longitude: -100,
  latitude: 40,
  zoom: 4,
};

function App() {
  return (
    <>
      <RMap
        initialViewState={usViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapTilerStreetsStyleUrl}
        minZoom={2}
      >
        <CustomOverlay>
          <PieCharts data={electionData} />
        </CustomOverlay>
      </RMap>
      <ControlPanel />
    </>
  );
}

export default App;
