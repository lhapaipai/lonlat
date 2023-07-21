import { useCallback, useMemo, useRef, useState } from "react";
import "../dialog/Dialog.scss";
import "./Select.scss";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
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

type SimpleProps<O extends Option> = {
  multiple?: false;
  value: string | null;
  onChangeValue: (option: O | null) => void;
};

type MultipleProps<O extends Option> = {
  multiple: true;
  value: string[];
  onChangeValue: (options: O[]) => void;
};

type BaseProps<O extends Option> = {
  showArrow?: boolean;
  selectionClassName?: string;
  width?: string;
  placement?: Placement;
  options: O[];
  placeholder?: string;
  getSearchableValue?: (matchReg: RegExp, option: O) => string;
  searchable?: boolean;
  required?: boolean;
  SelectOptionCustom?: typeof SelectOption<O>;
  SelectSelectionCustom?: typeof SelectSelection<O>;
};

type Props<O extends Option> = BaseProps<O> & (SimpleProps<O> | MultipleProps<O>);

function defaultGetSearchableValue(matchReg: RegExp, option: Option) {
  return matchReg.test(option.label.toLowerCase().trim());
}

function cbForMultiple<O extends Option>(
  multiple: boolean,
  _cb: SimpleProps<O>["onChangeValue"] | MultipleProps<O>["onChangeValue"],
): _cb is MultipleProps<O>["onChangeValue"] {
  return multiple;
}

export default function Select<O extends Option = Option>({
  multiple = false,
  showArrow = true,
  selectionClassName,
  width = "100%",
  placement = "bottom-start",
  searchable = false,
  required = true,
  value: valueOrValues = null,
  onChangeValue = () => {},
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

  const values = (
    multiple ? valueOrValues : valueOrValues === null ? [] : [valueOrValues]
  ) as string[];

  const selectedIndexes = filteredOptions
    .map((o, i) => (values.indexOf(o.value) !== -1 ? i : null))
    .filter((idx) => idx !== null) as number[];

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
          console.log(rects.floating.height);
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.min(availableHeight, 300)}px`,
            width: `${Math.max(130, rects.reference.width)}px`,
            height: "100%",
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
      if (cbForMultiple(multiple, onChangeValue)) {
        let newIndexes: number[];
        if (index === null) {
          newIndexes = selectedIndexes;
        } else if (selectedIndexes.indexOf(index) !== -1) {
          newIndexes = selectedIndexes.filter((i) => i !== index);
        } else {
          newIndexes = [...selectedIndexes, index];
        }
        const newValues = newIndexes.map((idx) => filteredOptions[idx]);
        onChangeValue(newValues);
      } else {
        if (index === null || !filteredOptions[index]) {
          onChangeValue(null);
        } else {
          onChangeValue(filteredOptions[index]);
        }
        setIsOpen(false);
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
    selectedIndex: selectedIndexes[0] ?? null,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const typeahead = useTypeahead(context, {
    enabled: !searchHasFocus,
    listRef: labelsRef,
    activeIndex,
    selectedIndex: selectedIndexes[0] ?? null,
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
      selectedIndexes,
      getItemProps,
      handleSelect,
    }),
    [activeIndex, values, getItemProps, handleSelect],
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
        <span className="input-element">
          {selectedIndexes.length > 0
            ? selectedIndexes.map((idx) => (
                <SelectSelectionComponent multiple={multiple} option={options[idx]} key={idx} />
              ))
            : placeholder}
        </span>
        {!required && !multiple && selectedIndexes.length > 0 && (
          <Button
            withRipple={false}
            icon
            shape="underline"
            onMouseDown={(e) => {
              // we don't want dropdown to open
              e.stopPropagation();
            }}
            onClick={() => {
              if (cbForMultiple(multiple, onChangeValue)) {
                onChangeValue([]);
              } else {
                onChangeValue(null);
              }
            }}
          >
            <i className="fe-cancel"></i>
          </Button>
        )}
        {showArrow && (
          <div className="arrow">
            <div className="ll-indicator"></div>
            <Button withRipple={false} icon shape="underline">
              <i className={isOpen ? "fe-angle-up" : "fe-angle-down"}></i>
            </Button>
          </div>
        )}
      </div>
      <FloatingPortal>
        <SelectContext.Provider value={selectContext}>
          {transitionStatus.isMounted && (
            <FloatingFocusManager context={context} modal={false}>
              <div
                className={cn("ll-dialog", "ll-select-dialog")}
                data-status={transitionStatus.status}
                ref={refs.setFloating}
                style={floatingStyles}
              >
                <div className="box" {...getFloatingProps()}>
                  {searchable && (
                    <div className="search-container">
                      <Input
                        placeholder="Search"
                        tabIndex={selectedIndexes.length === 0 ? 0 : -1}
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
      </FloatingPortal>
    </div>
  );
}
