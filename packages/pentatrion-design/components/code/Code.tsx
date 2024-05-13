import cn from "classnames";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Code({ children, className }: Props) {
  return (
    <code className={cn("px-1 rounded m-[1px] bg-gray-1 border border-gray-3", className)}>
      {children}
    </code>
  );
}
