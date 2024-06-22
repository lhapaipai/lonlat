import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import { ComponentProps, forwardRef } from "react";
import { useModalContext } from ".";
import clsx from "clsx";
import { Dialog } from "../dialog";

export const ModalContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ style, className, children, ...props }, propRef) => {
    const context = useModalContext();
    const floatingContext = context.context;

    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.open) {
      return null;
    }

    return (
      <FloatingPortal>
        <FloatingOverlay
          className={clsx([
            "z-overlay bg-gray-7/40 flex-center",
            "motion-safe:animate-fade-in-opacity",
          ])}
          lockScroll
        >
          <FloatingFocusManager context={floatingContext}>
            <Dialog
              className={clsx(
                "mx-4 min-w-96 max-w-full",
                `border-${context.color}-2`,
                "motion-safe:animate-fade-in",
                className,
              )}
              style={style}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}
            >
              <div ref={ref}>{children}</div>
            </Dialog>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  },
);
