import { memo, useMemo } from "react";
import { PoiGeoOption, RouteFeatureResponse } from "../../types.d";
import { ScaleLinear } from "d3";
import nearestPointOnLine from "@turf/nearest-point-on-line";
import { getIndexLetter } from "pentatrion-design";
import { WayPoint } from "./types";

interface Props {
  wayPoints?: WayPoint[] | null;
  pois?: PoiGeoOption[] | null;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  route: RouteFeatureResponse;
}

function ChartMarkers({ wayPoints, pois, xScale, yScale, route }: Props) {
  const waypointsInfos = useMemo(() => {
    return wayPoints?.map((wayPoint) => {
      if (wayPoint.type !== "Feature") {
        return {
          target: null,
          x: 0,
          y: 0,
        };
      }
      const snappedPoint = nearestPointOnLine(route, wayPoint);
      const x = Math.round(xScale(snappedPoint.properties.location));
      const y = yScale(
        route.geometry.coordinates[snappedPoint.properties.index][2],
      );
      return {
        target: wayPoint,
        x,
        y,
      };
    });
  }, [wayPoints, route, xScale, yScale]);

  const poisInfos = useMemo(() => {
    if (!pois) {
      return null;
    }
    const poisInfos = pois?.map((poi) => {
      // pixel perfect
      const x = Math.round(xScale(poi.geometry.coordinates[3]));
      const y = yScale(poi.geometry.coordinates[2]);

      return {
        target: poi,
        x,
        y,
      };
    });
    const xPositions: number[] = [];
    const filteredPoisInfos = poisInfos.filter((poiInfos) => {
      const show = xPositions.every((xPos) => Math.abs(xPos - poiInfos.x) > 15);
      if (show) {
        xPositions.push(poiInfos.x);
      }
      return show;
    });

    return filteredPoisInfos;
  }, [pois, xScale, yScale]);

  return (
    <g>
      {waypointsInfos?.map(({ target: wayPoint, x, y }, index) => {
        if (!wayPoint) {
          return;
        }

        return (
          <g transform={`translate(${x}, ${y})`} key={wayPoint.id}>
            <circle cx="0" cy="-12" r="10" fill="#fff" stroke="#ddd" />
            <text textAnchor="middle" fontSize="0.85rem" dy="-7">
              {getIndexLetter(index)}
            </text>
          </g>
        );
      })}
      {poisInfos?.map(({ target: poi, x, y }) => {
        return (
          <g transform={`translate(${x}, 0)`} key={poi.id}>
            <line
              x1={0}
              x2={0}
              y1={-10}
              y2={y}
              strokeWidth="2"
              opacity={0.1}
              stroke="black"
            />
            <text
              style={{
                transform: "rotate(var(--chart-poi-text-rotation))",
              }}
              fill="currentColor"
              textAnchor="start"
              fontSize="0.85rem"
              dx=".5em"
              dy="-1em"
            >
              {poi.properties.name}
              <tspan style={{ opacity: "var(--chart-poi-extra-opacity)" }}>
                {poi.properties.originalProperties.ele &&
                  `  alt: ${poi.geometry.coordinates[2]}m`}
              </tspan>
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default memo(ChartMarkers);
