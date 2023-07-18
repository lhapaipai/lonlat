import {
  autoUpdate,
  flip,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { useRef, useState } from "react";

const options = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Cyan",
  "Blue",
  "Purple",
  "Pink",
  "Maroon",
  "Black",
  "White",
];

export default function SelectOne() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            width: `${rects.reference.width}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const listContentRef = useRef(options);
  const isTypingRef = useRef(false);

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,

    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: isOpen ? setActiveIndex : setSelectedIndex,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    dismiss,
    role,
    listNav,
    typeahead,
    click,
  ]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const selectedItemLabel = selectedIndex !== null ? options[selectedIndex] : undefined;

  return (
    <>
      <label htmlFor="" id="select-label">
        Select balloon color
      </label>
      <div
        className="select-label"
        tabIndex={0}
        ref={refs.setReference}
        aria-labelledby="select-label"
        aria-autocomplete="none"
        {...getReferenceProps()}
      >
        {selectedItemLabel || "Select..."}
      </div>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                overflowY: "auto",
                background: "#eee",
                minWidth: 100,
                borderRadius: 8,
                outline: 0,
              }}
              {...getFloatingProps()}
            >
              {options.map((value, i) => (
                <div
                  key={value}
                  ref={(node) => {
                    listRef.current[i] = node;
                  }}
                  role="option"
                  tabIndex={i === activeIndex ? 0 : -1}
                  aria-selected={i === selectedIndex && i === activeIndex}
                  style={{
                    padding: 10,
                    cursor: "default",
                    background: i === activeIndex ? "cyan" : "",
                  }}
                  {...getItemProps({
                    onClick() {
                      handleSelect(i);
                    },
                    onKeyDown(event) {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSelect(i);
                      }

                      if (event.key === " " && !isTypingRef.current) {
                        event.preventDefault();
                        handleSelect(i);
                      }
                    },
                  })}
                >
                  {value}
                  <span aria-hidden style={{ position: "absolute", right: 10 }}>
                    {i === selectedIndex ? " ✓" : ""}
                  </span>
                </div>
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
