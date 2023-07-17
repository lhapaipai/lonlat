import { createContext, useContext } from "react";
import useModal from "./useModal";

type ContextType = ReturnType<typeof useModal> | null;

export const ModalContext = createContext<ContextType>(null);

export default function useModalContext() {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("Modal components must be wrapped in <Modal />");
  }

  return context;
}
