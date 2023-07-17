import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import cn from "classnames";

interface Props extends ComponentPropsWithRef<"a"> {
  children: ReactNode;
  ghost?: boolean;
}
const Href = forwardRef<HTMLAnchorElement, Props>(
  ({ href = "#", ghost = false, children, className, ...rest }, ref) => {
    return (
      <a ref={ref} href={href} className={cn("ll-href", ghost && "ghost", className)} {...rest}>
        {children}
      </a>
    );
  },
);

export default Href;
