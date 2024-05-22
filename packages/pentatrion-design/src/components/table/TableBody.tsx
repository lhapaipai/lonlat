import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function Table({ children, ...props }: Props) {
    return <tbody {...props}>{children}</tbody>;
}
