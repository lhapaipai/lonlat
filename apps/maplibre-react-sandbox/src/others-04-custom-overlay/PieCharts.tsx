import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { CountyElectionData } from "./types";
import { Map } from "maplibre-gl";
import { arc, pie } from "d3-shape";
import { COLORS } from "./ControlPanel";

interface Props {
  map?: Map;
  data: CountyElectionData[];
}

// const data = [
//   {
//     coordinates: [-118.26186, 34.19639],
//     dem: 2464364,
//     name: "Los Angeles, California",
//     rep: 769743,
//     total: 3434308,
//   },
//   ...
// ];

export default function PieCharts({ map, data }: Props) {
  const [hoveredCounty, setHoveredCounty] = useState<CountyElectionData | null>(null);

  console.log("render PieCharts");

  if (!map) {
    throw new Error("impossible");
  }

  const width = map.getContainer().clientWidth;
  const height = map.getContainer().clientHeight;

  const pies = useMemo(() => data.map((d) => makePieChart(d, setHoveredCounty)), [data]);

  const [originLngLat, content] = useMemo(() => {
    // on met un facteur multiplicateur dependant du zoom, mais les donut sont limités à une
    // taille minimale pour tout de même toujours afficher quelque chose.
    const scale = 2 ** Math.max(0, map.getZoom() - 6);

    return [
      map.unproject([0, 0]),
      data.map((d, i) => {
        const centroid = map.project(d.coordinates);
        return (
          <g key={d.name} transform={`translate(${centroid.x}, ${centroid.y}) scale(${scale})`}>
            {pies[i]}
          </g>
        );
      }),
    ];
  }, [map.getZoom(), pies, data]);

  /**
   * originLngLat correspond à notre origine au moment où on a généré tout notre html.
   * tant qu'aucun changement de zoom n'est effectué on peut se contenter de faire
   * une translation. origin contiendra le décalage en pixels entre l'origine de notre overlay
   * généré précédemment et l'origine après un déplacement sur la carte.
   */
  const origin = map.project(originLngLat);

  let tooltip;

  if (hoveredCounty) {
    const { dem = 0, rep = 0, total, coordinates, name } = hoveredCounty;
    const tooltipLocation = map.project(coordinates);
    tooltip = (
      <div id="tooltip" style={{ left: tooltipLocation.x, top: tooltipLocation.y }}>
        <div>
          <b>{name}</b>
        </div>
        <div>
          Democrats: {dem} ({((dem / total) * 100).toPrecision(3)}%)
        </div>
        <div>
          Republican: {rep} ({((rep / total) * 100).toPrecision(3)}%)
        </div>
      </div>
    );
  }

  return (
    <>
      <svg width={width} height={height} viewBox={`${-origin.x} ${-origin.y} ${width} ${height}`}>
        {content}
      </svg>
      {tooltip}
    </>
  );
}

function makePieChart(
  datum: CountyElectionData,
  onHover: Dispatch<SetStateAction<CountyElectionData | null>>,
) {
  const { dem = 0, rep = 0, total } = datum;

  const pathGenerator = arc();
  const arcs = pie()([dem, rep, total - dem - rep]);
  const radius = Math.sqrt(total) / 60;

  return (
    <g
      className="pie"
      pointerEvents="painted"
      onMouseMove={() => onHover(datum)}
      onMouseOut={() => onHover(null)}
    >
      {arcs.map((arc, i) => (
        <path
          key={i}
          fill={COLORS[i]}
          d={
            pathGenerator({
              innerRadius: radius * 0.3,
              outerRadius: radius,
              startAngle: arc.startAngle,
              endAngle: arc.endAngle,
            })!
          }
        />
      ))}
    </g>
  );
}
