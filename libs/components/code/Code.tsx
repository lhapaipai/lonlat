import { ReactNode } from "react";
import "./Code.scss";

interface Props {
    children: ReactNode;
}

export default function Code({ children }: Props) {
    return <code className="code">{children}</code>;
}
