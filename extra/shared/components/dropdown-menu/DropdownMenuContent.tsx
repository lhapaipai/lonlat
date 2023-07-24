import { ComponentProps, forwardRef } from "react";
import { useDropdownMenuContext } from ".";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import cn from "classnames";
import { computeArrowStyle } from "../dialog/util";

const DropdownMenuContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ style, children, ...props }, propRef) => {
    const context = useDropdownMenuContext();
    const floatingContext = context.context;

    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.transitionStatus.isMounted) {
      return null;
    }
    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} modal={context.modal}>
          <div
            className={cn(
              "ll-dropdown-menu",
              "ll-dialog",
              context.placement,
              `type-${context.type}`,
            )}
            ref={ref}
            style={{ ...context.floatingStyles, ...style }}
            data-status={context.transitionStatus.status}
            {...context.getFloatingProps(props)}
          >
            <div className="box">
              <FloatingList elementsRef={context.elementsRef} labelsRef={context.labelsRef}>
                {children}
              </FloatingList>
            </div>
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

export default DropdownMenuContent;
