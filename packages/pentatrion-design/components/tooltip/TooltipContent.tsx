import { ComponentProps, forwardRef } from "react";
import useTooltipContext from "./useTooltipContext";
import { FloatingPortal, useMergeRefs } from "@floating-ui/react";
import clsx from "clsx";
import { computeArrowStyle } from "../dialog/util";

const TooltipContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ style, children, className, ...props }, propRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.open) {
      return null;
    }
    return (
      <FloatingPortal>
        <div
          ref={ref}
          className={clsx(
            "ll-tooltip",
            context.middlewareData.hide?.referenceHidden && "invisible",
          )}
          style={{ ...context.floatingStyles, ...style }}
          {...context.getFloatingProps(props)}
        >
          <div
            className={clsx(
              "animate-fade-in",
              "ll-dialog",
              `placement-${context.placement}`,
              `border-${context.color}-2`,
              className,
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
