import { useClick, useClientPoint, useFloating, useInteractions } from "@floating-ui/react";
import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const clientPoint = useClientPoint(context);
  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([clientPoint, click]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        Reference element
      </div>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
          Floating element
        </div>
      )}
    </>
  );
}
