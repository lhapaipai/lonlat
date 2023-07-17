import { ComponentProps, forwardRef } from "react";
import useTooltipContext from "./useTooltipContext";
import { FloatingPortal, useMergeRefs } from "@floating-ui/react";
import cn from "classnames";
import { computeArrowStyle } from "../dialog/util";

const TooltipContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ style, children, ...props }, propRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.transitionStatus.isMounted) {
      return null;
    }
    return (
      <FloatingPortal>
        <div
          ref={ref}
          className={cn(
            "ll-tooltip",
            "ll-dialog",
            context.placement,
            `type-${context.type}`,
            context.middlewareData.hide?.referenceHidden && "hidden",
          )}
          style={{ ...context.floatingStyles, ...style }}
          data-status={context.transitionStatus.status}
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
