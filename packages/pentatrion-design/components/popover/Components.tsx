import { ComponentProps } from "react";
import { usePopoverContext } from ".";
import clsx from "clsx";
import { Button } from "../..";

interface PopoverHeaderProps extends ComponentProps<"h2"> {
  closeButton?: boolean;
}
export function PopoverHeader({
  children,
  closeButton = true,
  className,
  ...props
}: PopoverHeaderProps) {
  const { setOpen } = usePopoverContext();
  return (
    <>
      {closeButton && (
        <div className="p-1 float-right">
          <Button icon variant="text" color="gray" onClick={() => setOpen(false)}>
            <i className="fe-cancel"></i>
          </Button>
        </div>
      )}
      <header className={clsx("flex items-center px-2 pt-2", className)} {...props}>
        <h4>{children}</h4>
      </header>
    </>
  );
}
export function PopoverDescription({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx("p-2", className)} {...props}>
      {children}
    </div>
  );
}

export function PopoverFooter({ children, className, ...props }: ComponentProps<"footer">) {
  return (
    <footer className={clsx("relative z-10 px-2 pb-2", className)} {...props}>
      {children}
    </footer>
  );
}
