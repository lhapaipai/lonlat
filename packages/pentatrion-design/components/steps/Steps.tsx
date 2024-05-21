import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

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

export const stepsVariants = {
  direction: {
    horizontal: "",
    vertical: "",
  },
};

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
      className={clsx(["ll-steps", className])}
      data-global-line={(!associateLineWithStep).toString()}
      data-direction={direction}
      data-marker={markerType}
      style={{
        "--line-style": lineStyle,
        "--line-space": associateLineWithStep ? "4px" : "0px",
        // "--step-circle-radius": markerType === "circle" ? "18px" : "9px",
      }}
    />
  );
}
