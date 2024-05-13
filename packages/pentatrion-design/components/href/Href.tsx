import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import cn from "classnames";

interface Props extends ComponentPropsWithRef<"a"> {
  children: ReactNode;
  ghost?: boolean;
}
const Href = forwardRef<HTMLAnchorElement, Props>(
  ({ href = "#", ghost = false, children, className, ...rest }, ref) => {
    return (
      <a ref={ref} href={href} className={cn(ghost && "ghost-link", className)} {...rest}>
        {children}
      </a>
    );
  },
);

export default Href;
