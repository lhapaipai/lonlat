import {
  ChangeEvent,
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { SelectContext } from "./useSelectContext.ts";
import SelectSelection, { SelectSelectionProps } from "./SelectSelection.tsx";

import { Input, Button, useEventCallback } from "../..";
import type { Option } from "./interface";

import cn from "classnames";

export type SelectValue = number | string | null;
type ChangeEventLike = {
  target: {
    value: SelectValue;
  };
};

type Props<O extends Option = Option> = {
  variant?: "normal" | "ghost";
  showArrow?: boolean;
  selectionClassName?: string;
  width?: string;
  placement?: Placement;
  options: O[];
  placeholder?: string;
  getSearchableValue?: (matchReg: RegExp, option: O) => string;
  searchable?: boolean;
  required?: boolean;
  SelectOptionCustom?: (props: O) => ReactNode;
  SelectSelectionCustom?: (props: SelectSelectionProps<O>) => ReactNode;
  value?: SelectValue;
  onChange?: ((e: ChangeEventLike) => void) | null;
};

function defaultGetSearchableValue(matchReg: RegExp, option: Option) {
  return matchReg.test(option.label.toLowerCase().trim());
}

const Select = forwardRef<HTMLDivElement, Props>(
  (
    {
      variant = "normal",
      showArrow = true,
      selectionClassName,
      width = "100%",
      placement = "bottom",
      searchable = false,
      required = true,
      value = null,
      onChange = null,
      placeholder = "Select ...",
      getSearchableValue,
      SelectSelectionCustom,
      SelectOptionCustom,
      options = [],
    },
    propRef,
  ) => {
    const isControlled = onChange !== null;

    const onChangeStable = useEventCallback(onChange);

    const [uncontrolledSelectedIndex, setUncontrolledSelectedIndex] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    const filteredOptions = useMemo(
      () =>
        options.filter((option) => {
          if (!searchable || search.trim() === "") {
            return true;
          }
          const fn = getSearchableValue ?? defaultGetSearchableValue;
          const matchReg = new RegExp(search.toLowerCase().trim());
          return fn(matchReg, option);
        }),
      [searchable, search, getSearchableValue, options],
    );

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
              width: `${Math.max(130, rects.reference.width)}px`,
            });
            const firstChild = elements.floating.firstElementChild as HTMLElement;
            if (firstChild) {
              firstChild.style.maxHeight = `${Math.min(availableHeight, 300)}px`;
            }
          },
          padding: 10,
        }),
      ],
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

    useEffect(() => {
      if (SelectOptionCustom) {
        return;
      }
      filteredOptions.map((option, i) => {
        labelsRef.current[i] = option.label;
      });
    }, [search, filteredOptions, SelectOptionCustom]);

    const handleSelect = useCallback(
      (index: number | null) => {
        setIsOpen(false);
        setSearch("");
        if (isControlled) {
          const event: ChangeEventLike = {
            target: {
              value: index === null ? null : filteredOptions[index].value,
            },
          };
          onChangeStable(event);
        } else {
          setUncontrolledSelectedIndex(index);
        }
      },
      [isControlled, onChangeStable, filteredOptions],
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
      <div className={cn("ll-select", `variant-${variant}`)}>
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
              <SelectSelectionComponent {...filteredOptions[selectedIndex]} key={selectedIndex} />
            ) : (
              placeholder
            )}
          </span>
          {!required && selectedIndex !== null && (
            <Button
              withRipple={false}
              icon
              variant="ghost"
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
              <Button withRipple={false} icon variant="underline" focusable={false}>
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
                  className={cn("ll-portail-dialog")}
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
                >
                  <div
                    className={cn(
                      "ll-dialog",
                      `placement-${context.placement}`,
                      "ll-select-dialog",
                      "ll-animate",
                      "fade-in-list",
                    )}
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
                    {SelectOptionCustom ? (
                      <FloatingList elementsRef={listRef} labelsRef={labelsRef}>
                        {filteredOptions.map((option) => (
                          <SelectOptionCustom {...option} key={option.value} />
                        ))}
                      </FloatingList>
                    ) : (
                      filteredOptions.map((option, index) => {
                        const isActive = activeIndex === index;
                        const isSelected = selectedIndex === index;

                        return (
                          <button
                            key={option.value}
                            className={cn("option", isSelected && "selected", isActive && "active")}
                            role="option"
                            aria-selected={isActive && isSelected}
                            tabIndex={isActive ? 0 : -1}
                            ref={(node) => {
                              listRef.current[index] = node;
                            }}
                            {...getItemProps({
                              onClick: () => handleSelect(index),
                            })}
                          >
                            {option.label}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </FloatingFocusManager>
            )}
          </SelectContext.Provider>
        </FloatingPortal>
      </div>
    );
  },

  // see : React with Typescript -- Generics while using React.forwardRef
  // https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
) as <O extends Option>(p: Props<O> & { ref?: Ref<HTMLDivElement> }) => ReactElement;

export default Select;
