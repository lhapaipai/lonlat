import { getIndexLetter } from "pentatrion-design";
import { createLonLatGeoOption } from "pentatrion-geo";
import {
  type GradientMarker,
  RGradientMarker,
  Event,
  RLayer,
  RSource,
} from "maplibre-react-components";

import {
  directionFocusCoordinatesChanged,
  directionWayPointChanged,
  selectDirectionFocusCoordinates,
  selectDirectionPois,
  selectDirectionReadOnly,
  selectDirectionRoute,
  selectDirectionWayPoints,
  selectDirectionWayPointsGeojson,
} from "./directionSlice";

import { useAppDispatch, useAppSelector } from "~/store";

import {
  roadLayerStyle,
  roadLayerCasingStyle,
  waypointsLayerStyle,
  roadArrowLayerStyle,
  roadHaloPaintStyle,
  roadLayerAccomplishedStyle,
} from "~/config/mapStyles";
import { MapLayerMouseEvent } from "maplibre-gl";
import { feature, lineString, point } from "@turf/helpers";
import { nearestPointOnLine } from "@turf/nearest-point-on-line";
import { useMemo } from "react";
import { Feature, LineString } from "geojson";

export default function DirectionMap() {
  const dispatch = useAppDispatch();

  // we are not using selectValidDirectionWayPoints because we want real index
  // for getIndexLetter(index)
  const waypoints = useAppSelector(selectDirectionWayPoints);
  const directionRoute = useAppSelector(selectDirectionRoute);
  const directionWaypointsGeojson = useAppSelector(
    selectDirectionWayPointsGeojson,
  );
  const pois = useAppSelector(selectDirectionPois);
  const focusCoordinates = useAppSelector(selectDirectionFocusCoordinates);

  const readOnly = useAppSelector(selectDirectionReadOnly);

  const directionRouteAccomplished = useMemo((): Feature<LineString> => {
    if (!directionRoute || !focusCoordinates) {
      // returning an empty linestring allows us to avoid if in rendering
      // and adding/removing layer (beforeId management)
      return feature({
        type: "LineString",
        coordinates: [],
      });
    }
    const index = directionRoute.geometry.coordinates.findIndex(
      (coord) => coord[3] > focusCoordinates[3],
    );
    const segmentsAccomplished = directionRoute.geometry.coordinates.slice(
      0,
      index - 1,
    );
    segmentsAccomplished.push(focusCoordinates);
    return lineString(segmentsAccomplished);
  }, [directionRoute, focusCoordinates]);
  console.log("directionRouteAccomplished", directionRouteAccomplished);
  function handleDirectionWayPointDragEnd(
    e: Event<GradientMarker>,
    index: number,
  ) {
    const lonlatFeature = createLonLatGeoOption(e.target.getLngLat(), 0);
    dispatch(directionWayPointChanged({ index, feature: lonlatFeature }));
  }

  function handleRouteMouseMove(e: MapLayerMouseEvent) {
    if (!directionRoute) {
      throw new Error("you can't move on a non existant route");
    }

    const featurePoint = point(e.lngLat.toArray());

    const snappedPoint = nearestPointOnLine(directionRoute, featurePoint);

    /**
     * the snapped point only contains longitude and latitude
     * we take altitude from the nearest real point in the route
     * distance is given by the location property
     */
    const snappedPointCoords = [
      snappedPoint.geometry.coordinates[0],
      snappedPoint.geometry.coordinates[1],
      directionRoute.geometry.coordinates[snappedPoint.properties.index][2],
      snappedPoint.properties.location,
    ];
    dispatch(directionFocusCoordinatesChanged(snappedPointCoords));
  }

  function handleRouteMouseLeave() {
    dispatch(directionFocusCoordinatesChanged(null));
  }

  return (
    <>
      {waypoints.map(
        (feature, index) =>
          feature.type === "Feature" &&
          "Point" && (
            <RGradientMarker
              color={
                [0, waypoints.length - 1].includes(index)
                  ? "#ffe64b"
                  : "#c0c0c0"
              }
              scale={[0, waypoints.length - 1].includes(index) ? 1 : 0.75}
              key={feature.id}
              draggable={!readOnly}
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
          <RSource
            id="direction-route-accomplished"
            key="direction-route-accomplished"
            type="geojson"
            data={directionRouteAccomplished}
          />

          <RLayer
            id="direction-road-halo"
            onMouseMove={handleRouteMouseMove}
            onMouseLeave={handleRouteMouseLeave}
            type="line"
            {...roadHaloPaintStyle}
            source="direction-route"
            beforeId="point coté"
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
            id="direction-road-"
            key="direction-road"
            type="line"
            {...roadLayerStyle}
            source="direction-route"
            beforeId="point coté"
          />
          <RLayer
            id="direction-road-accomplished"
            key="direction-road-accomplished"
            type="line"
            {...roadLayerAccomplishedStyle}
            source="direction-route-accomplished"
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
      {directionWaypointsGeojson && (
        <>
          <RSource
            id="direction-waypoints"
            key="direction-waypoints"
            type="geojson"
            data={directionWaypointsGeojson}
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
      {pois &&
        pois.map((poi) => (
          <RGradientMarker
            key={poi.id}
            draggable={false}
            color="#e0e0e0"
            scale={0.5}
            longitude={poi.geometry.coordinates[0]}
            latitude={poi.geometry.coordinates[1]}
            icon={`fe-${poi.properties.type}`}
          />
        ))}
      {focusCoordinates && (
        <RGradientMarker
          longitude={focusCoordinates[0]}
          latitude={focusCoordinates[1]}
          icon="fe-person-walking"
          className="pointer-events-none"
        />
      )}
    </>
  );
}
