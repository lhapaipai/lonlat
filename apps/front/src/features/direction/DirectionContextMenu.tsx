import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuItemMouseEvent,
  getIndexLetter,
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "~/store";
import { MaplibreContextmenuEventDetail } from "maplibre-react-components";

import {
  directionWayPointChanged,
  directionWayPointInsertAt,
  selectDirectionWayPoints,
} from "./directionSlice";
import { createLonLatFeaturePoint } from "pentatrion-geo";
import { ReactElement } from "react";

export default function DirectionContextMenu() {
  const dispatch = useAppDispatch();

  const wayPointsLength = useAppSelector(selectDirectionWayPoints).length;

  function handleDirectionChangeWayPointAt(e: ContextMenuItemMouseEvent, index: number) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(directionWayPointChanged({ index, feature: lonlatFeature }));
  }

  function handleDirectionInsertWayPointBefore(e: ContextMenuItemMouseEvent, index: number) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(
      directionWayPointInsertAt({
        feature: lonlatFeature,
        index,
      }),
    );
  }

  function handleAppendDirection(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatFeaturePoint(mapEvent.detail.lngLat, 0);
    dispatch(
      directionWayPointInsertAt({
        feature: lonlatFeature,
        index: wayPointsLength,
      }),
    );
  }

  const contextItems: ReactElement[] = [];
  contextItems.push(
    <ContextMenuItem
      key="direction-from"
      icon={<span className="bullet">A</span>}
      label="Itinéraire depuis ce lieu"
      onClick={(e) => handleDirectionChangeWayPointAt(e, 0)}
    />,
  );
  for (let i = 1; i < wayPointsLength; i++) {
    contextItems.push(
      <ContextMenuItem
        className="discret"
        key={`direction-inter-${i}`}
        icon={<i className="fe-point-inter"></i>}
        label="point intermédiaire"
        onClick={(e) => handleDirectionInsertWayPointBefore(e, i)}
      />,
      <ContextMenuItem
        key={`direction-to-${i}`}
        icon={<span className="bullet">{getIndexLetter(i)}</span>}
        label={i < wayPointsLength - 1 ? "Déplacer ce point" : "Itinéraire vers ce lieu"}
        onClick={(e) => handleDirectionChangeWayPointAt(e, i)}
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
  return (
    <ContextMenu eventName="maplibre-contextmenu" compact={contextItems.length > 5 ? true : false}>
      {contextItems}
    </ContextMenu>
  );
}
