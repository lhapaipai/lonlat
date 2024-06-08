import { ComponentProps, forwardRef } from "react";
import { useDropdownMenuContext } from ".";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import clsx from "clsx";
import { Dialog } from "../dialog";

export const DropdownMenuContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ style, children, ...props }, propRef) => {
    const context = useDropdownMenuContext();
    const floatingContext = context.context;

    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.open) {
      return null;
    }
    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} modal={context.modal}>
          <div
            ref={ref}
            className="outline-none"
            style={{ ...context.floatingStyles, ...style }}
            {...context.getFloatingProps(props)}
          >
            <Dialog
              placement={context.placement}
              className={clsx(`border-${context.color}-2`, "animate-fade-in-list")}
            >
              <div className="box">
                <FloatingList elementsRef={context.elementsRef} labelsRef={context.labelsRef}>
                  {children}
                </FloatingList>
              </div>
            </Dialog>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);
