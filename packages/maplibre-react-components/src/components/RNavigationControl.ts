import { memo } from "react";
import { useControl } from "..";
import { NavigationControl } from "maplibre-gl";

function RNavigationControl() {
  useControl("top-right", () => new NavigationControl());
  return null;
}

export default memo(RNavigationControl);
