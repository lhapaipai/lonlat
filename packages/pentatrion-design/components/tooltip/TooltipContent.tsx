import { ComponentProps, forwardRef } from "react";
import { useTooltipContext } from ".";
import { FloatingPortal, useMergeRefs } from "@floating-ui/react";
import clsx from "clsx";
import { computeArrowStyle } from "../dialog/util";
import { Dialog } from "../dialog";

export const TooltipContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
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
            "z-tooltip outline-none",
            context.middlewareData.hide?.referenceHidden && "invisible",
          )}
          style={{ ...context.floatingStyles, ...style }}
          {...context.getFloatingProps(props)}
        >
          <Dialog
            placement={context.placement}
            className={clsx(
              "max-w-80 px-2 py-1 text-sm motion-safe:animate-fade-in",
              className,
            )}
            color={context.color}
          >
            {children}
            <div
              ref={context.arrowRef}
              style={computeArrowStyle(context)}
              className="p8n-arrow"
            ></div>
          </Dialog>
        </div>
      </FloatingPortal>
    );
  },
);
