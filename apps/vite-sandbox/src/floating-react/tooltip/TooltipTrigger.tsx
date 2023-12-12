import { HTMLProps, cloneElement, forwardRef, isValidElement } from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useTooltipContext } from "./useTooltipContext";

interface Props extends HTMLProps<HTMLElement> {
  asChild?: boolean;
}

const TooltipTrigger = forwardRef<HTMLElement, Props>(
  ({ children, asChild = false, ...props }, propRef) => {
    const context = useTooltipContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    if (asChild && isValidElement(children)) {
      return cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
          "data-state": context.open ? "open" : "closed",
        }),
      );
    }

    return (
      <button
        ref={ref}
        data-state={context.open ? "open" : "closed"}
        {...context.getReferenceProps(props)}
      >
        {children}
      </button>
    );
  },
);

export default TooltipTrigger;
