import { useControl } from "maplibre-react-components";
import { FrameRateControl } from "./FrameRateControl";

export function RFrameRateControl() {
  useControl({
    position: "top-left",
    factory: () => new FrameRateControl(),
  });
  return null;
}
