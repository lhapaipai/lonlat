import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Code({ children, className }: Props) {
  return (
    <code className={clsx("px-1 rounded m-[1px] bg-gray-1 border border-gray-3", className)}>
      {children}
    </code>
  );
}
