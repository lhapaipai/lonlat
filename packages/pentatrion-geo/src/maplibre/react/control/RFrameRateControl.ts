import { useControl } from "maplibre-react-components";
import FrameRateControl from "./FrameRateControl";

export default function RFrameRateControl() {
  useControl("bottom-left", () => new FrameRateControl());
  return null;
}
