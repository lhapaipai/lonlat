import clsx from "clsx";
import { ReactNode, ComponentProps } from "react";

interface Props extends ComponentProps<"td"> {
  children: ReactNode;
  label?: ReactNode | string;
}

export default function Table({ children, className, label, ...props }: Props) {
  return (
    <td className={clsx("p-2 block lg:table-cell", className)} {...props}>
      {label && <p className="font-medium text-sm text-neutral-2 lg:hidden">{label}</p>}
      {children}
    </td>
  );
}
