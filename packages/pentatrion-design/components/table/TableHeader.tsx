import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"thead"> {
  children: ReactNode;
}

export default function Table({ children, className, ...props }: Props) {
  return (
    <thead className={clsx("hidden lg:table-header-group", className)} {...props}>
      {children}
    </thead>
  );
}
