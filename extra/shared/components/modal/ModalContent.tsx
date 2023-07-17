import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import { ComponentProps, forwardRef } from "react";
import { useModalContext } from ".";
import cn from "classnames";

const ModalContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ style, children, ...props }, propRef) => {
    const context = useModalContext();
    const floatingContext = context.context;

    const ref = useMergeRefs([context.refs.setFloating, propRef]);
    if (!context.transitionStatus.isMounted) {
      return null;
    }

    return (
      <FloatingPortal>
        <FloatingOverlay className="ll-modal-overlay" lockScroll>
          <FloatingFocusManager context={floatingContext}>
            <div
              className={cn("ll-dialog", `type-${context.type}`)}
              ref={ref}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              style={style}
              data-status={context.transitionStatus.status}
              {...context.getFloatingProps(props)}
            >
              <div className="box">{children}</div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    );
  },
);

export default ModalContent;
