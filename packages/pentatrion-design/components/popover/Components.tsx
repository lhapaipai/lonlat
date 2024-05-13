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
        <div className="bar-buttons">
          <Button icon variant="ghost" onClick={() => setOpen(false)}>
            <i className="fe-cancel"></i>
          </Button>
        </div>
      )}
      <header className={clsx("header", className)} {...props}>
        <h4>{children}</h4>
      </header>
    </>
  );
}
export function PopoverDescription({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx("description", className)} {...props}>
      {children}
    </div>
  );
}

export function PopoverFooter({ children, className, ...props }: ComponentProps<"footer">) {
  return (
    <footer className={clsx("footer", className)} {...props}>
      {children}
    </footer>
  );
}
