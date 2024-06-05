import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
  return <button>{children}</button>;
}
