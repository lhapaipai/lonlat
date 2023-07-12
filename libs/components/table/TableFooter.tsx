import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
    return <tfoot {...props}>{children}</tfoot>;
}
