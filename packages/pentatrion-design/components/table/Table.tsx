import { ReactNode, ComponentProps } from "react";

import "./Table.scss";

interface Props extends ComponentProps<"table"> {
  children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
  return (
    <table className="ll-table" {...props}>
      {children}
    </table>
  );
}
