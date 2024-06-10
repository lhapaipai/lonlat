import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuItemMouseEvent,
} from "pentatrion-design";
import { useAppDispatch } from "../store";
import { searchFeatureChanged } from "./searchSlice";
import { createLonLatFeaturePoint } from "pentatrion-geo";
import {
  MaplibreContextmenuEventDetail,
  useCanvasRef,
} from "maplibre-react-components";

export default function SearchContextMenu() {
  const dispatch = useAppDispatch();
  const canvasRef = useCanvasRef();

  function handleClickInfos(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  return (
    <ContextMenu targetRef={canvasRef} eventName="contextmenu-maplibre">
      <ContextMenuItem
        key="search-infos"
        label="Plus d'infos sur cet endroit"
        onClick={handleClickInfos}
      />
    </ContextMenu>
  );
}
