import { ComponentProps } from "react";
import { useModalContext } from ".";

interface ModalHeaderProps extends ComponentProps<"h2"> {
  closeButton?: boolean;
}
export function ModalHeader({ children, closeButton = true, ...props }: ModalHeaderProps) {
  const { setOpen } = useModalContext();

  return (
    <header {...props}>
      <h2>{children}</h2>
      <div className="actions">
        {closeButton && (
          <button className="ll-button" onClick={() => setOpen(false)}>
            X
          </button>
        )}
      </div>
    </header>
  );
}
export function ModalDescription({ children, ...props }: ComponentProps<"div">) {
  return <div {...props}>{children}</div>;
}

export function ModalFooter(props: ComponentProps<"footer">) {
  return <footer {...props}></footer>;
}
