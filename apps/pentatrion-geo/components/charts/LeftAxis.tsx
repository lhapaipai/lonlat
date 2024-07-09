import { ScaleLinear } from "d3";
import { ComponentProps, useMemo } from "react";

interface Props extends ComponentProps<"g"> {
  yScale: ScaleLinear<number, number>;
  graphWidth: number;
}

export function LeftAxis({ graphWidth, yScale, ...rest }: Props) {
  const ticks = useMemo(() => {
    return yScale.ticks().map((value) => ({ value, yOffset: yScale(value) }));
  }, [yScale]);

  return (
    <g {...rest}>
      {ticks.map(({ value, yOffset }, idx) => {
        const principal = value % 500 === 0;

        // we hide line with idx === 0 to avoid conflict with BottomAxis
        return (
          <g
            key={value}
            transform={`translate(0, ${Math.round(yOffset) + 0.5})`}
          >
            {idx !== 0 && idx !== ticks.length - 1 && (
              <line
                stroke="currentColor"
                x1={-40}
                x2={graphWidth}
                opacity={principal ? 0.1 : 0.05}
                // strokeDasharray={principal ? undefined : "5 5"}
              ></line>
            )}
            {principal && (
              <text fill="currentColor" x="-5" dy="-0.3em">
                {value}m
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
