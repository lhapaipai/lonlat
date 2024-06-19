import { RMap, RNavigationControl } from "maplibre-react-components";

export default function App() {
  return (
    <RMap
      className="ml-theme-modern"
      style={{ minHeight: 200 }}
      mapStyle="https://demotiles.maplibre.org/style.json"
      initialAttributionControl={false}
    >
      <RNavigationControl position="top-left" />
      <div className="absolute bottom-4 left-4 rounded-2xl bg-gray-0 p-4">
        Inlined Control
      </div>
    </RMap>
  );
}
