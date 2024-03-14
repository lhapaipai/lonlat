import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useId,
} from "react";

interface ItemProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  active: boolean;
}
const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, active, style = {}, ...rest }, ref) => {
    const id = useId();
    return (
      <div
        ref={ref}
        role="option"
        id={id}
        aria-selected={active}
        {...rest}
        style={{
          background: active ? "lightblue" : "none",
          padding: 4,
          cursor: "default",
          ...style,
        }}
      >
        {children}
      </div>
    );
  },
);

export default Item;
