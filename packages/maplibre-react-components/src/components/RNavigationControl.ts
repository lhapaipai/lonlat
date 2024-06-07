import { memo } from "react";
import { useControl } from "../hooks/useControl";
import { NavigationControl } from "maplibre-gl";

export const RNavigationControl = memo(function RNavigationControl() {
  useControl("top-right", () => new NavigationControl());
  return null;
});
