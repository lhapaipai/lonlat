import { ComponentProps } from "react";
import { useModalContext } from ".";
import clsx from "clsx";
import { Button } from "../button";
import { Scroll } from "../scroll";

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

interface ModalDescriptionProps extends ComponentProps<"div"> {
  height?: number;
}
export function ModalDescription({ children, className, height, ...props }: ModalDescriptionProps) {
  if (!height) {
    return (
      <div className={clsx("p-2", className)} {...props}>
        {children}
      </div>
    );
  }
  return (
    <div className={clsx("py-2", className)} {...props}>
      <Scroll style={{ height: `${height}px` }}>{children}</Scroll>
    </div>
  );
}

export function ModalFooter({ children, className, ...props }: ComponentProps<"footer">) {
  return (
    <footer className={clsx("relative z-10 px-2 pb-2", className)} {...props}>
      {children}
    </footer>
  );
}
