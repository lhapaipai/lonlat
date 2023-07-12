import { ThHTMLAttributes, ReactNode } from "react";

interface Props extends ThHTMLAttributes<HTMLTableCellElement> {
    children: ReactNode;
    label?: ReactNode | string;
}

export default function Table({ children, label, ...props }: Props) {
    return (
        <td {...props}>
            {label && <p className="cell-label">{label}</p>}
            {children}
        </td>
    );
}
