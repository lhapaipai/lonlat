import { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return <div className="ll-card p-2 bg-green-200 shadow-lg">{children}</div>;
}
