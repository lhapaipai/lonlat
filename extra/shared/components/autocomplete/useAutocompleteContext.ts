import { useInteractions } from "@floating-ui/react";
import { createContext, useContext } from "react";
import { Option } from "./interface";

interface AutocompleteContext {
  activeIndex: number | null;
  selection: Option | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

export const AutocompleteContext = createContext<AutocompleteContext | null>(null);

export default function useAutocomplete() {
  const context = useContext(AutocompleteContext);
  if (context === null) {
    throw new Error("Autocomplete components must be wrapped in <Autocomplete>");
  }
  return context;
}
