import { getIndexLetter } from "pentatrion-design";
import {
  createLonLatGeoOption,
  lineString,
  simplifyCoords,
} from "pentatrion-geo";
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
  selectDirectionProfile,
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
import { point } from "@turf/helpers";
import { nearestPointOnLine } from "@turf/nearest-point-on-line";
import { useMemo, useState } from "react";
import { Feature, LineString } from "geojson";
import { selectViewStateZoom } from "~/store/mapSlice";
import { selectReadOnly } from "~/store/configSlice";

function lonlatToleranceByZoom(zoom: number) {
  if (zoom < 7) {
    return 0.01;
  }
  switch (Math.round(zoom)) {
    case 7:
      return 0.005;
    case 8:
      return 0.002;
    case 9:
      return 0.001;
    case 10:
      return 0.0005;
    case 11:
      return 0.0003;
    case 12:
      return 0.0002;
    default:
      return 0.0001;
  }
}

const iconByProfile = {
  pedestrian: "fe-person-walking",
  bike: "fe-person-biking",
  car: "fe-car",
};

export default function DirectionMap() {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  // we are not using selectValidDirectionWayPoints because we want real index
  // for getIndexLetter(index)
  const waypoints = useAppSelector(selectDirectionWayPoints);
  const directionRoute = useAppSelector(selectDirectionRoute);
  const mapZoom = useAppSelector(selectViewStateZoom);
  const directionWaypointsGeojson = useAppSelector(
    selectDirectionWayPointsGeojson,
  );
  const pois = useAppSelector(selectDirectionPois);
  const focusCoordinates = useAppSelector(selectDirectionFocusCoordinates);
  const profile = useAppSelector(selectDirectionProfile);
  const readOnly = useAppSelector(selectReadOnly);

  const simplifiedRoute: Feature<LineString> | null = useMemo(() => {
    if (!directionRoute) {
      return null;
    }

    if (mapZoom > 14) {
      return directionRoute;
    }

    const simplifiedCoords = simplifyCoords(
      directionRoute.geometry.coordinates,
      lonlatToleranceByZoom(mapZoom),
    );

    return lineString(simplifiedCoords);
  }, [directionRoute, mapZoom]);

  /**
   * simplifiedRouteAccomplished is an invalid LineString from turf's point
   * of view because it can have as coordinates an empty array, don't use turf
   * utility functions (eg: nearestPointOnLine) on it
   */
  const simplifiedRouteAccomplished = useMemo((): Feature<LineString> => {
    if (!simplifiedRoute || !focusCoordinates) {
      // returning an empty linestring allows us to avoid conditional rendering
      // and beforeId management when adding/removing layer
      return lineString([]);
    }
    const index = simplifiedRoute.geometry.coordinates.findIndex(
      (coord) => coord[3] > focusCoordinates[3],
    );
    const segmentsAccomplished = simplifiedRoute.geometry.coordinates.slice(
      0,
      index,
    );
    segmentsAccomplished.push(focusCoordinates);
    return lineString(segmentsAccomplished);
  }, [simplifiedRoute, focusCoordinates]);

  function handleDirectionWayPointDragStart() {
    setIsDragging(true);
  }

  function handleDirectionWayPointDragEnd(
    e: Event<GradientMarker>,
    index: number,
  ) {
    setIsDragging(false);
    const lonlatFeature = createLonLatGeoOption(e.target.getLngLat(), 0);
    dispatch(directionWayPointChanged({ index, feature: lonlatFeature }));
  }

  function handleRouteMouseMove(e: MapLayerMouseEvent) {
    if (isDragging) {
      dispatch(directionFocusCoordinatesChanged(null));
      return;
    }
    /**
     * we will not use the simplified route because it does not have altitude information
     */
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
      {simplifiedRoute && (
        <>
          <RSource
            id="direction-route"
            key="direction-route"
            type="geojson"
            data={simplifiedRoute}
          />
          <RSource
            id="direction-route-accomplished"
            key="direction-route-accomplished"
            type="geojson"
            data={simplifiedRouteAccomplished}
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
            layout={roadLayerCasingStyle.layout}
            paint={
              isDragging
                ? roadLayerCasingStyle.paintTemp
                : roadLayerCasingStyle.paint
            }
            source="direction-route"
            beforeId="point coté"
          />

          <RLayer
            id="direction-road-"
            key="direction-road"
            type="line"
            layout={roadLayerStyle.layout}
            paint={isDragging ? roadLayerStyle.paintTemp : roadLayerStyle.paint}
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
            shape="circle"
            interactive={false}
            color="#e0e0e0"
            scale={0.75}
            longitude={poi.geometry.coordinates[0]}
            latitude={poi.geometry.coordinates[1]}
            icon={`fe-${poi.properties.type}`}
          />
        ))}
      {focusCoordinates && (
        <RGradientMarker
          shape="circle"
          interactive={false}
          color="#136a7a"
          scale={0.75}
          longitude={focusCoordinates[0]}
          latitude={focusCoordinates[1]}
          icon={iconByProfile[profile]}
          className="pointer-events-none"
        />
      )}
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
              onDragStart={handleDirectionWayPointDragStart}
              onDragEnd={(e) => {
                handleDirectionWayPointDragEnd(e, index);
              }}
              text={getIndexLetter(index)}
            />
          ),
      )}
    </>
  );
}
