import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
    return <tr {...props}>{children}</tr>;
}
