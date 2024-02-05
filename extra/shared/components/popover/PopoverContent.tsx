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
    if (!context.open) {
      return null;
    }
    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} modal={context.modal}>
          <div
            className={cn(
              "ll-popover",
              "ll-dialog",
              `placement-${context.placement}`,
              `type-${context.type}`,
              "ll-animate",
              "fade-in",
            )}
            ref={ref}
            style={{ ...context.floatingStyles, ...style }}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
          >
            {children}
            <div ref={context.arrowRef} style={computeArrowStyle(context)} className="arrow"></div>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);

export default PopoverContent;
