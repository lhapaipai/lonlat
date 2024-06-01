import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithRef<"a"> {
  children: ReactNode;
  ghost?: boolean;
}
export const Href = forwardRef<HTMLAnchorElement, Props>(
  ({ href = "#", ghost = false, children, className, ...rest }, ref) => {
    return (
      <a ref={ref} href={href} className={clsx(ghost && "ghost-link", className)} {...rest}>
        {children}
      </a>
    );
  },
);
