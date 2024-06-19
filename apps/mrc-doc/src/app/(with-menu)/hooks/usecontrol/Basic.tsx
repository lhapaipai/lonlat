"use client";

import {
  RMap,
  RNavigationControl,
  useControl,
} from "maplibre-react-components";
import { CustomControl } from "./CustomControl";

function RCustomControl() {
  useControl({
    position: "top-right",
    factory: () => new CustomControl(),
  });
  return null;
}

export default function App() {
  return (
    <RMap className="ml-theme-modern">
      <RNavigationControl />
      <RCustomControl />
    </RMap>
  );
}
