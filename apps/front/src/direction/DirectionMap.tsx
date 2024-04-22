import { getIndexLetter } from "pentatrion-design";
import { LLMarker, RLLMarker, createLonLatFeaturePoint } from "pentatrion-geo";
import { Event, RLayer, RSource } from "maplibre-react-components";

import {
  directionWayPointChanged,
  selectDirectionRoute,
  selectDirectionWaypoints,
  selectValidDirectionWayPoints,
} from "./directionSlice";

import { useAppDispatch, useAppSelector } from "../store";

import {
  roadLayerStyle,
  roadLayerCasingStyle,
  waypointsLayerStyle,
  roadArrowLayerStyle,
} from "../config/mapStyles";

export default function DirectionMap() {
  const dispatch = useAppDispatch();

  const validDirectionWayPoints = useAppSelector(selectValidDirectionWayPoints);
  const directionRoute = useAppSelector(selectDirectionRoute);
  const directionWaypoints = useAppSelector(selectDirectionWaypoints);

  function handleDirectionWayPointDragEnd(e: Event<LLMarker>, index: number) {
    const lonlatFeature = createLonLatFeaturePoint(e.target.getLngLat(), 0);
    dispatch(directionWayPointChanged({ index, feature: lonlatFeature }));
  }

  return (
    <>
      {validDirectionWayPoints.map(
        (feature, index) =>
          feature?.geometry.type === "Point" && (
            <RLLMarker
              color={
                [0, validDirectionWayPoints.length - 1].includes(index) ? "#ffe64b" : "#c0c0c0"
              }
              scale={[0, validDirectionWayPoints.length - 1].includes(index) ? 1 : 0.75}
              key={feature.id}
              draggable={true}
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              onDragEnd={(e) => handleDirectionWayPointDragEnd(e, index)}
              text={getIndexLetter(index)}
            />
          ),
      )}
      {directionRoute && (
        <>
          <RSource
            id="direction-route"
            key="direction-route"
            type="geojson"
            data={directionRoute}
          />
          <RLayer
            id="direction-road-casing"
            key="direction-road-casing"
            type="line"
            {...roadLayerCasingStyle}
            source="direction-route"
            beforeId="point coté"
          />
          <RLayer
            id="direction-road"
            key="direction-road"
            type="line"
            {...roadLayerStyle}
            source="direction-route"
            beforeId="point coté"
          />
          <RLayer
            id="directon-arrow"
            key="directon-arrow"
            type="symbol"
            minzoom={7}
            {...roadArrowLayerStyle}
            source="direction-route"
            beforeId="point coté"
          />
        </>
      )}
      {directionWaypoints && (
        <>
          <RSource
            id="direction-waypoints"
            key="direction-waypoints"
            type="geojson"
            data={directionWaypoints}
          />
          <RLayer
            id="direction-waypoints"
            type="circle"
            {...waypointsLayerStyle}
            source="direction-waypoints"
            beforeId="point coté"
          />
        </>
      )}
    </>
  );
}
