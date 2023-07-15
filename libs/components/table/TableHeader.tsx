import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"thead"> {
  children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
  return <thead {...props}>{children}</thead>;
}
