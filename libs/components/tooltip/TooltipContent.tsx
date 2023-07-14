import { HTMLProps, forwardRef } from "react";
import useTooltipContext from "./useTooltipContext";
import { FloatingPortal, Placement, Side, useMergeRefs } from "@floating-ui/react";
import { useTooltip } from ".";
import cn from "classnames";

function getSide(placement: Placement): Side {
  return placement.split("-")[0] as Side;
}

function computeArrowStyle({ middlewareData, placement }: ReturnType<typeof useTooltip>) {
  if (!middlewareData.arrow) {
    return {
      display: "none",
    };
  }

  const { x, y } = middlewareData.arrow;
  const staticSide: "bottom" | "left" | "top" | "right" = (
    {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    } as const
  )[getSide(placement)];

  return {
    left: x != null ? `${x}px` : "",
    top: y != null ? `${y}px` : "",
    [staticSide]: "-6px",
  };
}

const TooltipContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ style, children, ...props }, propRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.open) return null;

    return (
      <FloatingPortal>
        <div
          ref={ref}
          className={cn(
            "ll-tooltip",
            context.placement,
            `type-${context.type}`,
            context.middlewareData.hide?.referenceHidden && "hidden",
          )}
          style={{ ...context.floatingStyles, ...style }}
          {...context.getFloatingProps(props)}
        >
          <div className="box">{children}</div>
          <div
            ref={context.arrowRef}
            style={computeArrowStyle(context)}
            className="arrow arrow-bg"
          ></div>
          <div style={computeArrowStyle(context)} className="arrow arrow-shadow"></div>
        </div>
      </FloatingPortal>
    );
  },
);

export default TooltipContent;
