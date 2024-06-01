import { ReactNode, ComponentProps } from "react";

interface Props extends ComponentProps<"table"> {
  children: ReactNode;
}

export function Table({ children, ...props }: Props) {
  return (
    <table className="w-full" {...props}>
      {children}
    </table>
  );
}
