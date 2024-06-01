import { createContext, useContext } from "react";
import { useDropdownMenu } from ".";

type ContextType = ReturnType<typeof useDropdownMenu> | null;

export const DropdownMenuContext = createContext<ContextType>(null);

export function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext);

  if (context === null) {
    throw new Error("DropdownMenu components must be wrapped in <DropdownMenu />");
  }

  return context;
}
