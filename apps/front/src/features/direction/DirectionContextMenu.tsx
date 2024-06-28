import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuItemMouseEvent,
  getIndexLetter,
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "~/store";
import {
  MaplibreContextmenuEventDetail,
  useCanvasRef,
} from "maplibre-react-components";

import {
  directionWayPointChanged,
  directionWayPointInsertAt,
  selectDirectionWayPoints,
} from "./directionSlice";
import { createLonLatGeoOption } from "pentatrion-geo";
import { ReactElement } from "react";
import { useT } from "talkr";

export default function DirectionContextMenu() {
  const dispatch = useAppDispatch();
  const canvasRef = useCanvasRef();
  const { T } = useT();

  const wayPointsLength = useAppSelector(selectDirectionWayPoints).length;

  function handleDirectionChangeWayPointAt(
    e: ContextMenuItemMouseEvent,
    index: number,
  ) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatGeoOption(mapEvent.detail.lngLat, 0);
    dispatch(directionWayPointChanged({ index, feature: lonlatFeature }));
  }

  function handleDirectionInsertWayPointBefore(
    e: ContextMenuItemMouseEvent,
    index: number,
  ) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatGeoOption(mapEvent.detail.lngLat, 0);
    dispatch(
      directionWayPointInsertAt({
        feature: lonlatFeature,
        index,
      }),
    );
  }

  function handleAppendDirection(e: ContextMenuItemMouseEvent) {
    const mapEvent = e as CustomEvent<MaplibreContextmenuEventDetail>;
    const lonlatFeature = createLonLatGeoOption(mapEvent.detail.lngLat, 0);
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
      label={T("contextMenu.directionFrom")}
      onClick={(e) => handleDirectionChangeWayPointAt(e, 0)}
    />,
  );
  for (let i = 1; i < wayPointsLength; i++) {
    contextItems.push(
      <ContextMenuItem
        className="discret"
        key={`direction-inter-${i}`}
        icon={<i className="fe-point-inter"></i>}
        label={T("contextMenu.directionInter")}
        onClick={(e) => handleDirectionInsertWayPointBefore(e, i)}
      />,
      <ContextMenuItem
        key={`direction-to-${i}`}
        icon={<span className="bullet">{getIndexLetter(i)}</span>}
        label={T(
          `contextMenu.${i < wayPointsLength - 1 ? "movePoint" : "directionTo"}`,
        )}
        onClick={(e) => handleDirectionChangeWayPointAt(e, i)}
      />,
    );
  }

  contextItems.push(
    <ContextMenuItem
      key="direction-plus"
      icon={<i className="fe-plus"></i>}
      label={T("contextMenu.directionAdd")}
      onClick={(e) => handleAppendDirection(e)}
    />,
  );

  return (
    <ContextMenu targetRef={canvasRef} eventName="contextmenu-maplibre">
      {/* @ts-ignore TODO */}
      {contextItems}
    </ContextMenu>
  );
}
