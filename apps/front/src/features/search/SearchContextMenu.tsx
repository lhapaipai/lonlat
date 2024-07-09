import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuItemMouseEvent,
} from "pentatrion-design";
import { useAppDispatch } from "~/store";
import { searchFeatureChanged } from "./searchSlice";
import { createLonLatGeoOption } from "pentatrion-geo/geo-options";
import {
  MaplibreContextmenuEventDetail,
  useCanvasRef,
} from "maplibre-react-components";
import { useT } from "talkr";
import { referenceFeatureChanged } from "../isochrone/isochroneSlice";

export default function SearchContextMenu() {
  const dispatch = useAppDispatch();
  const canvasRef = useCanvasRef();
  const { T } = useT();
  function handleClickInfos(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatGeoOption(mapEvent.detail.lngLat, 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  function handleClickIsochrone(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatGeoOption(mapEvent.detail.lngLat, 0);
    dispatch(referenceFeatureChanged(lonlatFeature));
  }

  return (
    <ContextMenu targetRef={canvasRef} eventName="contextmenu-maplibre">
      <ContextMenuItem
        label={T("contextMenu.searchInfos")}
        onClick={handleClickInfos}
      />
      <ContextMenuItem
        label={T("contextMenu.isochrone")}
        onClick={handleClickIsochrone}
      />
    </ContextMenu>
  );
}
