import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"tfoot"> {
  children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
  return <tfoot {...props}>{children}</tfoot>;
}
