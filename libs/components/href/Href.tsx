import { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import cn from "classnames";

interface Props extends ComponentPropsWithRef<"a"> {
  children: ReactNode;
}
const Href = forwardRef<HTMLAnchorElement, Props>(
  ({ href = "#", children, className, ...rest }, ref) => {
    return (
      <a ref={ref} href={href} className={cn("ll-link", className)} {...rest}>
        {children}
      </a>
    );
  },
);

export default Href;
