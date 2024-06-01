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
  ({ style, children, ...props }, propRef) => {
    const context = useModalContext();
    const floatingContext = context.context;

    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.open) {
      return null;
    }

    return (
      <FloatingPortal>
        <FloatingOverlay
          className={clsx(["flex-center bg-gray-7/40 z-overlay", "animate-fade-in-opacity"])}
          lockScroll
        >
          <FloatingFocusManager context={floatingContext}>
            <Dialog
              className={clsx("w-96 max-w-full", `border-${context.color}-2`, "animate-fade-in")}
              ref={ref}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              style={style}
              {...context.getFloatingProps(props)}
            >
              {children}
            </Dialog>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  },
);
