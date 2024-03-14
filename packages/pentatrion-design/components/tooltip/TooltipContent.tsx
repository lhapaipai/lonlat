import { ComponentProps, forwardRef } from "react";
import useTooltipContext from "./useTooltipContext";
import { FloatingPortal, useMergeRefs } from "@floating-ui/react";
import cn from "classnames";
import { computeArrowStyle } from "../dialog/util";

const TooltipContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ style, children, ...props }, propRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.open) {
      return null;
    }
    return (
      <FloatingPortal>
        <div
          ref={ref}
          className={cn("ll-tooltip", context.middlewareData.hide?.referenceHidden && "hidden")}
          style={{ ...context.floatingStyles, ...style }}
          {...context.getFloatingProps(props)}
        >
          <div
            className={cn(
              "ll-animate",
              "fade-in",
              "ll-dialog",
              `placement-${context.placement}`,
              `border-color-${context.color}`,
            )}
          >
            {children}
            <div ref={context.arrowRef} style={computeArrowStyle(context)} className="arrow"></div>
          </div>
        </div>
      </FloatingPortal>
    );
  },
);

export default TooltipContent;
