import { scaleLinear, extent, line, curveMonotoneX, bisector, area } from "d3";
import { CSSProperties, useMemo, useRef, MouseEvent } from "react";
import { useDimensions } from "./useDimensions";
import simplify from "simplify-js";
import { createPortal } from "react-dom";
import BottomAxis from "./BottomAxis";
import LeftAxis from "./LeftAxis";
import { PoiGeoOption, RouteFeatureResponse } from "../../types.d";
import { Position } from "geojson";
import { customRound } from "../../geo-options";
import ChartMarkers from "./ChartMarkers";
import { WayPoint } from "./types";

const defaultStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
};

interface Props {
  tolerance?: number;
  showExtremas?: boolean;
  focusCoordinates: Position | null;
  route: RouteFeatureResponse;
  pois?: PoiGeoOption[] | null;
  wayPoints?: WayPoint[] | null;
  onChangeFocusCoordinates: (coords: Position | null) => void;
  debug?: boolean;
  style?: CSSProperties;
}

const tooltipOffsetY = 13;

const bisect = bisector<Position, number>((d) => d[3]).right;

type ChartPoint = {
  x: number; // distance
  y: number; // altitude
};

export function ElevationChart({
  tolerance = 0.1,
  showExtremas = true,
  focusCoordinates,
  onChangeFocusCoordinates,
  route,
  pois = null,
  wayPoints = null,
  style,
}: Props) {
  const graphBoxRef = useRef<SVGRectElement>(null!);
  const [containerRef, size] = useDimensions();

  const { elevationProfil, xExtent, yExtent } = useMemo(() => {
    const { coordinates } = route.geometry;
    /**
     * const position: Position = [lng, lat, altitude, distance];
     * we want x as distance and y as altitude
     */
    const rawGraph = coordinates.map((position) => ({
      x: position[3],
      y: position[2],
    }));
    const elevationProfil = simplify(rawGraph, tolerance);

    return {
      elevationProfil,
      xExtent: extent(coordinates, (d) => d[3]) as [number, number],
      yExtent: extent(coordinates, (d) => d[2]) as [number, number],
    };
  }, [tolerance, route]);

  const { eleLine, eleArea, xScale, yScale } = useMemo(() => {
    const xScale = scaleLinear().domain(xExtent).range([0, size.width]);
    const yScale = scaleLinear().domain(yExtent).range([size.height, 0]);
    const eleLine = line<ChartPoint>()
      .curve(curveMonotoneX)
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    const eleArea = area<ChartPoint>()
      .curve(curveMonotoneX)
      .x((d) => xScale(d.x))
      .y1((d) => yScale(d.y))
      .y0(yScale(yExtent[0]));

    return { eleLine, eleArea, xScale, yScale };
  }, [xExtent, yExtent, size.width, size.height]);

  const xCursor = focusCoordinates
    ? Math.round(xScale(focusCoordinates[3]))
    : null;

  function handleMove(e: MouseEvent<SVGRectElement>) {
    const box = graphBoxRef.current.getBoundingClientRect();

    const xCursor = e.clientX - box.left;
    const distanceCursor = xScale.invert(xCursor);
    const i = bisect(route.geometry.coordinates, distanceCursor, 1);
    onChangeFocusCoordinates(route.geometry.coordinates[i]);
  }

  function handleMouseLeave() {
    onChangeFocusCoordinates(null);
  }

  return (
    <div ref={containerRef} style={style ?? defaultStyle}>
      {focusCoordinates &&
        xCursor &&
        createPortal(
          <div
            className="pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-full rounded-2xl bg-gray-0 p-2 text-sm shadow"
            style={{
              left: size.marginLeft + xCursor,
              top: size.svgTop + size.marginTop - tooltipOffsetY,
            }}
          >
            <div>distance: {customRound(focusCoordinates[3], 1)}km</div>
            <div>altitude: {Math.round(focusCoordinates[2])}m</div>
          </div>,
          document.body,
        )}
      <svg
        width={size.svgWidth}
        height={size.svgHeight}
        className="absolute inset-0"
      >
        <defs aria-hidden="true">
          <clipPath id="graph-selection">
            <rect x={0} y={0} width={xCursor || 0} height={size.height} />
          </clipPath>
          <linearGradient id="gradient-selection" x1="0" x2="0" y1="0" y2="1">
            <stop offset="50%" stopColor="steelblue" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="steelblue" stopOpacity="0"></stop>
          </linearGradient>
        </defs>

        <LeftAxis
          yScale={yScale}
          graphWidth={size.width}
          transform={`translate(${size.marginLeft}, ${size.marginTop})`}
          fontSize="0.85rem"
          textAnchor="end"
        />
        <BottomAxis
          xScale={xScale}
          transform={`translate(${size.marginLeft}, ${size.marginTop + size.height})`}
          fontSize="0.85rem"
          textAnchor="middle"
        />
        <g transform={`translate(${size.marginLeft},${size.marginTop})`}>
          <rect
            ref={graphBoxRef}
            width={size.width}
            height={size.height}
            fill="transparent"
            onMouseMove={handleMove}
            onMouseLeave={handleMouseLeave}
          />

          <g style={{ pointerEvents: "none" }}>
            <path
              fill="none"
              stroke="steelblue"
              strokeWidth="1.5"
              d={eleLine(elevationProfil) || ""}
            />
            <path
              id="simplified-line"
              fill="steelblue"
              fillOpacity="0.2"
              strokeWidth="0"
              style={{ mixBlendMode: "normal" }}
              d={eleArea(elevationProfil) || ""}
            />

            <ChartMarkers
              wayPoints={wayPoints}
              pois={pois}
              xScale={xScale}
              yScale={yScale}
              route={route}
            />

            {xCursor && (
              <>
                <line
                  x1={xCursor}
                  x2={xCursor}
                  y1={-tooltipOffsetY}
                  y2={size.height}
                  fill="none"
                  strokeWidth={2}
                  stroke="black"
                  opacity={0.1}
                />
                <path
                  clipPath="url(#graph-selection)"
                  fill="url(#gradient-selection)"
                  fillOpacity="0.6"
                  strokeWidth="0"
                  d={eleArea(elevationProfil) || ""}
                />
              </>
            )}

            {showExtremas &&
              route.properties.maxima?.map((idx) => (
                <circle
                  fill="red"
                  cx={xScale(route.geometry.coordinates[idx][3])}
                  cy={yScale(route.geometry.coordinates[idx][2])}
                  r={3}
                  key={`maximas-${idx}`}
                />
              ))}
            {showExtremas &&
              route.properties.minima?.map((idx) => (
                <circle
                  fill="green"
                  cx={xScale(route.geometry.coordinates[idx][3])}
                  cy={yScale(route.geometry.coordinates[idx][2])}
                  r={3}
                  key={`minima-${idx}`}
                />
              ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
