import { ComponentProps } from "react";
import { useModalContext } from ".";
import cn from "classnames";
import { Button, Scroll } from "../..";

interface ModalHeaderProps extends ComponentProps<"h2"> {
  closeButton?: boolean;
}
export function ModalHeader({
  children,
  className,
  closeButton = true,
  ...props
}: ModalHeaderProps) {
  const { setOpen } = useModalContext();

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

interface ModalDescriptionProps extends ComponentProps<"div"> {
  height?: number;
}
export function ModalDescription({ children, className, height, ...props }: ModalDescriptionProps) {
  if (!height) {
    return (
      <div className={cn("description", className)} {...props}>
        {children}
      </div>
    );
  }
  return (
    <div className={cn("description", "scrollable", className)} {...props}>
      <Scroll style={{ height: `${height}px` }}>{children}</Scroll>
    </div>
  );
}

export function ModalFooter({ children, className, ...props }: ComponentProps<"footer">) {
  return (
    <footer className={cn("footer", className)} {...props}>
      {children}
    </footer>
  );
}
