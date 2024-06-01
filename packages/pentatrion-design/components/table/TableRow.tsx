import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"tr"> {
  children: ReactNode;
}

export function TableRow({ children, className, ...props }: Props) {
  return (
    <tr className={clsx("border-b border-gray-3 block lg:table-row", className)} {...props}>
      {children}
    </tr>
  );
}
