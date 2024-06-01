import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function TableBody({ children, ...props }: Props) {
  return <tbody {...props}>{children}</tbody>;
}
