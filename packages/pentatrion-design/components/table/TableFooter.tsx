import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"tfoot"> {
  children: ReactNode;
}

export function TableFooter({ children, ...props }: Props) {
  return <tfoot {...props}>{children}</tfoot>;
}
