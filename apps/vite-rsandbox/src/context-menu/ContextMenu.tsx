import { HTMLProps, forwardRef, useRef, useState } from "react";

interface Props {
  label?: string;
  nested?: boolean;
}

export const ContextMenu = forwardRef<HTMLButtonElement, Props & HTMLProps<HTMLButtonElement>>(
  ({ children }, forwardedRef) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const listContentRef = useRef();
    return <div></div>;
  },
);
