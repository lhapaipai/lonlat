import {
  getIndexLetter,
  ContextMenu,
  ContextMenuItem,
  ContextMenuItemMouseEvent,
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
import { createLonLatGeoOption } from "pentatrion-geo/geo-options/lonlat";
import { isNoData } from "pentatrion-geo/geo-options/nodata";
import { ReactElement, useEffect } from "react";
import { useT } from "talkr";

export default function DirectionContextMenu() {
  const dispatch = useAppDispatch();
  const canvasRef = useCanvasRef();
  const { T } = useT();

  useEffect(() => {
    const ref = canvasRef.current;
    function handleContextMenu(e: MouseEvent) {
      console.log("onContextMenu", e);
    }
    ref.addEventListener("contextmenu", handleContextMenu);
    return () => {
      ref.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [canvasRef]);

  const wayPoints = useAppSelector(selectDirectionWayPoints);

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
        index: wayPoints.length,
      }),
    );
  }

  const contextItems: ReactElement[] = [];
  contextItems.push(
    <ContextMenuItem
      key="direction-from"
      icon={<span className="bullet">A</span>}
      label={T(
        `contextMenu.${isNoData(wayPoints[0]) ? "directionFrom" : "movePoint"}`,
      )}
      onClick={(e) => handleDirectionChangeWayPointAt(e, 0)}
    />,
  );
  for (let i = 1; i < wayPoints.length; i++) {
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
          `contextMenu.${isNoData(wayPoints[i]) ? "directionTo" : "movePoint"}`,
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
