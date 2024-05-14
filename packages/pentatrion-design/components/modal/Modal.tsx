import { ReactNode } from "react";
import { ModalOptions } from "./interface";
import useModal from "./useModal";
import { ModalContext } from "./useModalContext";

interface Props extends ModalOptions {
  children?: ReactNode;
}

export default function Modal({ children, ...options }: Props) {
  const modal = useModal(options);
  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
}
