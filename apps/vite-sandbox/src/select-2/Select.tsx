import {
  ChangeEvent,
  ReactElement,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
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
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { SelectContext } from "./useSelectContext.ts";

import type { Option } from "./interface";

import cn from "classnames";

type Value = number | string;
type ChangeEventLike = {
  target: {
    value: Value | null;
  };
};

type Props<O extends Option> = {
  showArrow?: boolean;
  selectionClassName?: string;
  width?: string;
  placement?: Placement;
  // options: O[];
  placeholder?: string;
  // getSearchableValue?: (matchReg: RegExp, option: O) => string;
  searchable?: boolean;
  required?: boolean;
  // SelectOptionCustom?: typeof SelectOption<O>;
  // SelectSelectionCustom?: typeof SelectSelection<O>;

  value?: Value | null;
  onChange?: ((e: ChangeEventLike) => void) | null;

  children: ReactElement;
};

function defaultGetSearchableValue(matchReg: RegExp, option: Option) {
  return matchReg.test(option.label.toLowerCase().trim());
}

const Select = forwardRef<HTMLDivElement, Props<Option>>(
  (
    {
      showArrow = true,
      selectionClassName,
      width = "100%",
      placement = "bottom",
      searchable = false,
      required = true,
      value = null,
      onChange = null,
      placeholder = "Select ...",
      // getSearchableValue,
    },
    propRef,
  ) => {
    const isControlled = onChange !== null;

    const [uncontrolledSelectedIndex, setUncontrolledSelectedIndex] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    // const filteredOptions = useMemo(
    //   () =>
    //     options.filter((option) => {
    //       if (!searchable || search.trim() === "") {
    //         return true;
    //       }
    //       const fn = getSearchableValue ?? defaultGetSearchableValue;
    //       const matchReg = new RegExp(search.toLowerCase().trim());
    //       return fn(matchReg, option);
    //     }),
    //   [searchable, search, getSearchableValue, options],
    // );

    let selectedIndex: number | null = null;
    if (isControlled) {
      if (value !== null) {
        const pos = filteredOptions.findIndex((o) => o.value === value);
        if (pos !== -1) {
          selectedIndex = pos;
        }
      }
    } else {
      selectedIndex = uncontrolledSelectedIndex;
    }

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchHasFocus, setSearchHasFocus] = useState(false);

    const SelectSelectionComponent = SelectSelectionCustom ?? SelectSelection;
    const SelectOptionComponent = SelectOptionCustom ?? SelectOption;

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
      setActiveIndex(null);
      setSearch(e.target.value);
    }

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
              width: `${Math.max(130, rects.reference.width)}px`,
            });
          },
          padding: 10,
        }),
      ],
      transform: false,
    });

    const ref = useMergeRefs([refs.setReference, propRef]);

    const listRef = useRef<Array<HTMLElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const isTypingRef = useRef(false);

    const click = useClick(context, { event: "mousedown" });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "listbox" });
    const listNav = useListNavigation(context, {
      listRef,
      activeIndex,
      focusItemOnHover: searchable ? false : true,
      selectedIndex,
      onNavigate: setActiveIndex,
      loop: true,
    });

    const typeahead = useTypeahead(context, {
      enabled: !searchHasFocus,
      listRef: labelsRef,
      activeIndex,
      selectedIndex,
      onMatch: isOpen ? setActiveIndex : undefined,
      onTypingChange(isTyping) {
        isTypingRef.current = isTyping;
      },
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
      listNav,
      typeahead,
      click,
      dismiss,
      role,
    ]);

    const handleSelect = useCallback(
      (index: number | null) => {
        setIsOpen(false);
        if (isControlled) {
          const event: ChangeEventLike = {
            target: {
              value: index === null ? null : filteredOptions[index].value,
            },
          };
          onChange(event);
        } else {
          setUncontrolledSelectedIndex(index);
        }
      },
      [isControlled, onChange, filteredOptions],
    );

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
      <div className={cn("ll-select")}>
        <div
          className={cn("selection", selectionClassName, isOpen && "focus")}
          ref={ref}
          tabIndex={0}
          style={{
            width,
          }}
          {...getReferenceProps()}
        >
          <span className="input-element">
            {selectedIndex !== null ? (
              <SelectSelectionComponent
                multiple={false}
                option={filteredOptions[selectedIndex]}
                key={selectedIndex}
              />
            ) : (
              placeholder
            )}
          </span>
          {!required && selectedIndex !== null && (
            <Button
              withRipple={false}
              icon
              shape="ghost"
              onMouseDown={(e) => {
                // we don't want dropdown to open
                e.stopPropagation();
              }}
              onClick={() => {
                handleSelect(null);
              }}
            >
              <i className="fe-cancel"></i>
            </Button>
          )}
          {showArrow && (
            <div className="arrow">
              <div className="ll-indicator"></div>
              <Button withRipple={false} icon shape="ghost" focusable={false}>
                <i className={isOpen ? "fe-angle-up" : "fe-angle-down"}></i>
              </Button>
            </div>
          )}
        </div>
        <FloatingPortal>
          <SelectContext.Provider value={selectContext}>
            {isOpen && (
              <FloatingFocusManager context={context} modal={false}>
                <div
                  className={cn(
                    "ll-dialog",
                    "ll-portail-dialog",
                    `placement-${context.placement}`,
                    "ll-select-dialog",
                    "ll-animate",
                    "fade-in-list",
                  )}
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
                >
                  {searchable && (
                    <div className="search-container">
                      <Input
                        placeholder="Search"
                        tabIndex={selectedIndex === null ? 0 : -1}
                        value={search}
                        onChange={handleSearchChange}
                        onFocus={() => setSearchHasFocus(true)}
                        onBlur={() => setSearchHasFocus(false)}
                      ></Input>
                    </div>
                  )}
                  <FloatingList elementsRef={listRef} labelsRef={labelsRef}>
                    {filteredOptions.map((option) => (
                      <SelectOptionComponent option={option} key={option.value} />
                    ))}
                  </FloatingList>
                </div>
              </FloatingFocusManager>
            )}
          </SelectContext.Provider>
        </FloatingPortal>
      </div>
    );
  },
);

export default Select;