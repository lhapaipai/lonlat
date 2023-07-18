import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import "../dialog/Dialog.scss";
import "./Select.scss";
import {
  FloatingFocusManager,
  FloatingList,
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
  useTransitionStatus,
  useTypeahead,
} from "@floating-ui/react";
import { SelectContext } from "./useSelectContext";
import { SelectOption, SelectSelection } from ".";
import { Input } from "../..";
import type { Option } from "./interface.d.ts";

export type Props = {
  value: string;
  onChange: (option: Option | null) => void;
  options: Option[];
  placeholder?: string;
  getSearchableValue?: (matchReg: RegExp, option: Option) => string;
  searchable?: boolean;
  /**
   * Render function to render the displayed value inside the select's
   * anchor. If null is returned, will fall back to the internal implementation.
   */
  renderOption?: (option: Option) => ReactNode;
  renderSelected?: (placeholder: string, selected?: Option) => ReactNode;
};

function defaultGetSearchableValue(matchReg: RegExp, option: Option) {
  return matchReg.test(option.label.toLowerCase().trim());
}

export default function Select({
  value,
  searchable = false,
  onChange,
  placeholder = "Select ...",
  getSearchableValue,
  renderSelected,
  renderOption,
  options = [],
}: Props) {
  const [search, setSearch] = useState("");
  const filteredOptions = options.filter((option) => {
    if (!searchable || search.trim() === "") {
      return true;
    }
    const fn = getSearchableValue ?? defaultGetSearchableValue;
    const matchReg = new RegExp(search.toLowerCase().trim());
    return fn(matchReg, option);
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchHasFocus, setSearchHasFocus] = useState(false);

  const selectedIndex = filteredOptions.findIndex((o) => o.value === value) ?? null;

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
            maxHeight: `${Math.min(availableHeight, 300)}px`,
            width: `${rects.reference.width}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const handleSelect = useCallback((index: number | null) => {
    setIsOpen(false);
    if (index === null || !options[index]) {
      onChange(null);
    } else {
      onChange(options[index]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTypeaheadMatch(index: number | null) {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    // when we open the dropdown menu we want to have the focus on selectedItem
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const typeahead = useTypeahead(context, {
    enabled: !searchHasFocus,
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    listNav,
    typeahead,
    click,
    dismiss,
    role,
  ]);

  const transitionStatus = useTransitionStatus(context, {
    duration: 250,
  });

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
    <div className="ll-select">
      <div className="selection" ref={refs.setReference} tabIndex={0} {...getReferenceProps()}>
        {renderSelected?.(placeholder, options[selectedIndex]) ?? (
          <SelectSelection placeholder={placeholder} option={options[selectedIndex]} />
        )}
        <div className="arrow flex-center mr-2">
          <i className={isOpen ? "fe-up-dir" : "fe-down-dir"}></i>
        </div>
      </div>
      <SelectContext.Provider value={selectContext}>
        {transitionStatus.isMounted && (
          <FloatingFocusManager context={context} modal={false}>
            <div className="ll-dialog" data-status={transitionStatus.status}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                className="box"
                {...getFloatingProps()}
              >
                {searchable && (
                  <div>
                    <Input
                      tabIndex={0}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onFocus={() => setSearchHasFocus(true)}
                      onBlur={() => setSearchHasFocus(false)}
                    ></Input>
                  </div>
                )}
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  {filteredOptions.map((option) => {
                    return renderOption ? (
                      renderOption(option)
                    ) : (
                      <SelectOption option={option} key={option.value} />
                    );
                  })}
                </FloatingList>
              </div>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </div>
  );
}
