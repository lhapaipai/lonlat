import { ThHTMLAttributes, ReactNode } from "react";

interface Props extends ThHTMLAttributes<HTMLTableCellElement> {
    children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
    return <th {...props}>{children}</th>;
}
