import { ScaleLinear } from "d3";
import { ComponentProps, useMemo } from "react";

interface Props extends ComponentProps<"g"> {
  xScale: ScaleLinear<number, number>;
}

export function BottomAxis({ xScale, ...rest }: Props) {
  const ticks = useMemo(() => {
    return xScale.ticks().map((value) => ({ value, xOffset: xScale(value) }));
  }, [xScale]);

  const range = xScale.range();
  // d={["M", range[0] + 0.5, 6, "v", -5.5, "H", range[1] + 0.5, "v", 5.5].join(" ")}

  return (
    <g {...rest}>
      <path
        d={["M", range[0], 0, "H", range[1]].join(" ")}
        stroke="currentColor"
        opacity={0.1}
        strokeWidth={2}
        fill="none"
      />
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line
            stroke="currentColor"
            y1="1"
            y2="6"
            opacity={0.1}
            strokeWidth={2}
          ></line>
          <text fill="currentColor" y="9" dy="0.71em">
            {value}
          </text>
        </g>
      ))}
    </g>
  );
}
