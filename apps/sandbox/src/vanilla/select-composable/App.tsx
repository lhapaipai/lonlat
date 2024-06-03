import {
  FloatingFocusManager,
  FloatingList,
  autoUpdate,
  flip,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import {
  Children,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

interface SelectContextValue {
  activeIndex: number | null;
  selectedIndex: number | null;
  activeValue: string | null;
  selectedValue: string | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number | null) => void;
}

const SelectContext = createContext<SelectContextValue>({} as SelectContextValue);

type Value = number | string;
type ChangeEventLike = {
  target: {
    value: Value | null;
  };
};

interface SelectProps {
  children: ReactElement | ReactElement[];

  value?: Value | null;
  onChange?: ((e: ChangeEventLike) => void) | null;
}

function Select({ children, value = null, onChange }: SelectProps) {
  const isControlled = onChange !== null;
  const [uncontrolledSelectedIndex, setUncontrolledSelectedIndex] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  let selectedIndex: number | null = null;
  if (isControlled) {
    if (value !== null) {
      const pos = Children.forEach(child);
    }
  } else {
    selectedIndex = uncontrolledSelectedIndex;
  }

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [flip()],
  });

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const handleSelect = useCallback((index: number | null) => {
    setSelectedIndex(index);
    setIsOpen(false);
    if (index !== null) {
      setSelectedLabel(labelsRef.current[index]);
    }
  }, []);

  function handleTypeaheadMatch(index: number | null) {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    listNav,
    typeahead,
    click,
    dismiss,
    role,
  ]);

  const selectContext = useMemo(
    () => ({
      activeIndex,
      selectedIndex,
      getItemProps,
      handleSelect,
    }),
    [activeIndex, selectedIndex, getItemProps, handleSelect],
  );

  return (
    <>
      <div ref={refs.setReference} tabIndex={0} {...getReferenceProps()}>
        {selectedLabel ?? "Select..."}
      </div>
      <SelectContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </>
  );
}

function Option({ label, value }: { label: string; value: string }) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useContext(SelectContext);

  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      style={{
        background: isActive ? "cyan" : "",
        fontWeight: isSelected ? "bold" : "",
      }}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      {label}
    </button>
  );
}

export default function App() {
  return (
    <>
      <div className="container">
        <Select>
          <p>coucou</p>
          <Option label="Apple" value="apple" />
          <p className="m-2">
            <Option label="Blueberry" value="blueberry" />
          </p>
          <Option label="Watermelon" value="watermelon" />
          <Option label="Banana" value="banana" />
        </Select>
      </div>
    </>
  );
}
