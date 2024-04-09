import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuItemMouseEvent,
  getIndexLetter,
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "./store";
import { searchFeatureChanged } from "./store/searchSlice";
import {
  directionLocationChanged,
  directionLocationInsertAt,
  selectDirectionLocations,
} from "./store/directionSlice";
import { createLonLatFeaturePoint } from "pentatrion-geo";
import {
  ContextMenuEventDispatcher,
  MaplibreContextmenuEventDetail,
} from "maplibre-react-components";
import { selectTab } from "./store/mapSlice";
import { ReactElement } from "react";

export default function ContextMenuManager() {
  const dispatch = useAppDispatch();
  const tab = useAppSelector(selectTab);

  const locationsLength = useAppSelector(selectDirectionLocations).length;

  function handleDirectionChangeLocationAt(e: ContextMenuItemMouseEvent, index: number) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(directionLocationChanged({ index, feature: lonlatFeature }));
  }

  function handleDirectionInsertLocationBefore(e: ContextMenuItemMouseEvent, index: number) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(
      directionLocationInsertAt({
        feature: lonlatFeature,
        index,
      }),
    );
  }

  function handleAppendDirection(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(
      directionLocationInsertAt({
        feature: lonlatFeature,
        index: locationsLength,
      }),
    );
  }

  function handleClickInfos(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(searchFeatureChanged(lonlatFeature));
  }

  const contextItems: ReactElement[] = [];
  if (tab === "search") {
    contextItems.push(
      <ContextMenuItem
        key="search-infos"
        label="Plus d'infos sur cet endroit"
        onClick={handleClickInfos}
      />,
    );
  } else if (tab === "direction") {
    contextItems.push(
      <ContextMenuItem
        key="direction-from"
        icon={<span className="bullet">A</span>}
        label="Itinéraire depuis ce lieu"
        onClick={(e) => handleDirectionChangeLocationAt(e, 0)}
      />,
    );
    for (let i = 1; i < locationsLength; i++) {
      contextItems.push(
        <ContextMenuItem
          className="discret"
          key="direction-inter"
          icon={<i className="fe-point-inter"></i>}
          label="point intermédiaire"
          onClick={(e) => handleDirectionInsertLocationBefore(e, i)}
        />,
        <ContextMenuItem
          key="direction-to"
          icon={<span className="bullet">{getIndexLetter(i)}</span>}
          label={i < locationsLength - 1 ? "Déplacer ce point" : "Itinéraire vers ce lieu"}
          onClick={(e) => handleDirectionChangeLocationAt(e, i)}
        />,
      );
    }

    contextItems.push(
      <ContextMenuItem
        key="direction-plus"
        icon={<i className="fe-plus"></i>}
        label="Prolonger l'itinéraire jusqu'ici"
        onClick={(e) => handleAppendDirection(e)}
      />,
    );
  }

  return contextItems.length > 0 ? (
    <ContextMenuEventDispatcher>
      <ContextMenu eventName="maplibre-contextmenu" compact={locationsLength > 2}>
        {contextItems}
      </ContextMenu>
    </ContextMenuEventDispatcher>
  ) : null;
}
