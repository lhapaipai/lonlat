import { RMap, RPopup } from "maplibre-react-components";

const center: [number, number] = [4.8, 45.7];

export default function App() {
  return (
    <RMap className="ml-theme-modern" initialCenter={center} initialZoom={2}>
      <RPopup longitude={center[0]} latitude={center[1]}>
        Welcome Lyon !
      </RPopup>
    </RMap>
  );
}
