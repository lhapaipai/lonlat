import { useCallback, useMemo, useRef, useState } from "react";
import "../dialog/Dialog.scss";
import "./Select.scss";
import {
  FloatingFocusManager,
  FloatingList,
  Placement,
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
import SelectOption from "./SelectOption";
import SelectSelection from "./SelectSelection";

import { Input, Button } from "../..";
import type { Option } from "./interface.d.ts";

import cn from "classnames";

type Props<O extends Option> = {
  showArrow?: boolean;
  selectionClassName?: string;
  width?: string;
  placement?: Placement;
  value: string | null;
  onChange: (option: O | null) => void;
  options: O[];
  placeholder?: string;
  getSearchableValue?: (matchReg: RegExp, option: O) => string;
  searchable?: boolean;
  required?: boolean;
  SelectOptionCustom?: typeof SelectOption<O>;
  SelectSelectionCustom?: typeof SelectSelection<O>;
};

function defaultGetSearchableValue(matchReg: RegExp, option: Option) {
  return matchReg.test(option.label.toLowerCase().trim());
}

export default function Select<O extends Option>({
  showArrow = true,
  selectionClassName,
  width = "100%",
  placement = "bottom-start",
  value,
  searchable = false,
  required = true,
  onChange,
  placeholder = "Select ...",
  getSearchableValue,
  SelectSelectionCustom,
  SelectOptionCustom,
  options = [],
}: Props<O>) {
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

  const selectedIndex = filteredOptions.findIndex((o) => o.value === value);

  const SelectSelectionComponent = SelectSelectionCustom ?? SelectSelection;
  const SelectOptionComponent = SelectOptionCustom ?? SelectOption;

  const { refs, floatingStyles, context } = useFloating({
    placement,
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
            width: `${Math.max(200, rects.reference.width)}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const handleSelect = useCallback(
    (index: number | null) => {
      setIsOpen(false);

      if (index === null || !filteredOptions[index]) {
        onChange(null);
      } else {
        onChange(filteredOptions[index]);
      }
      setSearch("");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredOptions],
  );

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
    focusItemOnHover: searchable ? false : true,
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
      <div
        className={cn("selection", selectionClassName)}
        ref={refs.setReference}
        tabIndex={0}
        style={{
          width,
        }}
        {...getReferenceProps()}
      >
        <SelectSelectionComponent placeholder={placeholder} option={options[selectedIndex]} />
        {!required && value !== null && (
          <Button
            withRipple={false}
            icon
            shape="ghost"
            onMouseDown={(e) => {
              // we don't want dropdown to open
              e.stopPropagation();
            }}
            onClick={(e) => {
              onChange(null);
            }}
          >
            <i className="fe-cancel"></i>
          </Button>
        )}
        {showArrow && (
          <div className="arrow flex-center mr-2">
            <i className={isOpen ? "fe-up-dir" : "fe-down-dir"}></i>
          </div>
        )}
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
                  <div className="search-container">
                    <Input
                      placeholder="Search"
                      tabIndex={selectedIndex === -1 ? 0 : -1}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onFocus={() => setSearchHasFocus(true)}
                      onBlur={() => setSearchHasFocus(false)}
                    ></Input>
                  </div>
                )}
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  {filteredOptions.map((option) => (
                    <SelectOptionComponent option={option} key={option.value} />
                  ))}
                </FloatingList>
              </div>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </div>
  );
}
