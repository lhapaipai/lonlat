import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"tr"> {
  children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
  return <tr {...props}>{children}</tr>;
}
