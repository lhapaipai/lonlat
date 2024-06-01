import { useInteractions } from "@floating-ui/react";
import { createContext, useContext } from "react";
import { OptionLike } from "../select";

interface AutocompleteContext {
  activeIndex: number | null;
  selection: OptionLike | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

export const AutocompleteContext = createContext<AutocompleteContext | null>(null);

export function useAutocomplete() {
  const context = useContext(AutocompleteContext);
  if (context === null) {
    throw new Error("Autocomplete components must be wrapped in <Autocomplete>");
  }
  return context;
}
