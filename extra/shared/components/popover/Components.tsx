import { ComponentProps } from "react";
import { usePopoverContext } from ".";

export function PopoverHeading({ children, ...props }: ComponentProps<"h2">) {
  return <h2 {...props}>{children}</h2>;
}
export function PopoverDescription({ children, ...props }: ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

export function PopoverClose(props: ComponentProps<"button">) {
  const { setOpen } = usePopoverContext();

  return (
    <div>
      <button
        type="button"
        {...props}
        onClick={(e) => {
          props.onClick?.(e);
          setOpen(false);
        }}
      ></button>
    </div>
  );
}
