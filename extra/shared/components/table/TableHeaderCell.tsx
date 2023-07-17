import { ReactNode, ComponentProps } from "react";

interface Props extends ComponentProps<"th"> {
  children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
  return <th {...props}>{children}</th>;
}
