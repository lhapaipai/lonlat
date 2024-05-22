import { useControl } from "maplibre-react-components";
import FrameRateControl from "./FrameRateControl";

export default function RFrameRateControl() {
  useControl("top-left", () => new FrameRateControl());
  return null;
}
