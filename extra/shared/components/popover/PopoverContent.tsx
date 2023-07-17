import { ComponentProps, forwardRef } from "react";
import { usePopoverContext } from ".";
import { FloatingFocusManager, FloatingPortal, useMergeRefs } from "@floating-ui/react";
import cn from "classnames";
import { computeArrowStyle } from "../dialog/util";

const PopoverContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ style, children, ...props }, propRef) => {
    const context = usePopoverContext();
    const floatingContext = context.context;

    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.transitionStatus.isMounted) {
      return null;
    }
    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} modal={context.modal}>
          <div
            className={cn("ll-popover", "ll-dialog", context.placement, `type-${context.type}`)}
            ref={ref}
            style={{ ...context.floatingStyles, ...style }}
            data-status={context.transitionStatus.status}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
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
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);

export default PopoverContent;
