import { HTMLProps, cloneElement, forwardRef, isValidElement } from "react";
import { useDropdownMenuContext } from ".";
import { useMergeRefs } from "@floating-ui/react";
import { Button } from "../button";

interface Props extends HTMLProps<HTMLElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = forwardRef<HTMLElement, Props>(
  ({ children, asChild = false, ...props }, propRef) => {
    const context = useDropdownMenuContext();
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
      <Button
        variant="outlined"
        ref={ref}
        data-state={context.open ? "open" : "closed"}
        {...context.getReferenceProps(props)}
      >
        {children}
      </Button>
    );
  },
);

export default DropdownMenuTrigger;
