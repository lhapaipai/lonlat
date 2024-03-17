import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import "./Steps.scss";

interface Props extends ComponentPropsWithoutRef<"ul"> {
  direction?: "horizontal" | "vertical";
  lineStyle?: "solid" | "dashed" | "dotted";
  markerType?: "circle" | "bullet";
}

export default function VerticalSteps({
  direction = "vertical",
  lineStyle = "solid",
  markerType = "circle",
  className,
  ...rest
}: Props) {
  return (
    <ul
      {...rest}
      className={cn([
        "ll-steps",
        `direction-${direction}`,
        `border-${lineStyle}`,
        `marker-${markerType}`,
        className,
      ])}
      style={{
        "--border-style": lineStyle,
      }}
    />
  );
}
