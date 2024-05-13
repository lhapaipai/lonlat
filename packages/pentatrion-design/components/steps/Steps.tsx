import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import "./Steps.scss";

interface Props extends ComponentPropsWithoutRef<"ul"> {
  direction?: "horizontal" | "vertical";
  lineStyle?: "solid" | "dashed" | "dotted";
  markerType?: "circle" | "bullet";

  /**
   * if your Step is multiline keep it false
   * better render and add line-space
   *
   * if your Steps are Sortable and eash Step si only one line
   * and steps are vertical
   * set it to true, line will not be animated when sorting
   */
  associateLineWithStep?: boolean;
}

export default function Steps({
  direction = "vertical",
  lineStyle = "solid",
  markerType = "circle",
  associateLineWithStep = true,
  className,
  ...rest
}: Props) {
  return (
    <ul
      {...rest}
      className={clsx([
        "ll-steps",
        `direction-${direction}`,
        `border-${lineStyle}`,
        `marker-${markerType}`,
        associateLineWithStep ? `step-line` : `steps-line`,
        className,
      ])}
      style={{
        "--border-style": lineStyle,
      }}
    />
  );
}
