import { DetailedHTMLProps, TableHTMLAttributes, ReactNode } from "react";

import "./Table.scss";

interface Props extends DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
    children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
    return (
        <table className="table" {...props}>
            {children}
        </table>
    );
}
