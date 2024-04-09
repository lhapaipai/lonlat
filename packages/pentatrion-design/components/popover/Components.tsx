import { ComponentProps } from "react";
import { usePopoverContext } from ".";
import cn from "classnames";
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
      <header className={cn("header", className)} {...props}>
        <h4>{children}</h4>
      </header>
    </>
  );
}
export function PopoverDescription({ children, className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("description", className)} {...props}>
      {children}
    </div>
  );
}

export function PopoverFooter({ children, className, ...props }: ComponentProps<"footer">) {
  return (
    <footer className={cn("footer", className)} {...props}>
      {children}
    </footer>
  );
}
