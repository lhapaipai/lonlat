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
import { SelectSelection, SelectSelectionProps, SelectContext } from ".";

import type { Option } from "./interface";
import clsx from "clsx";
import { Input } from "../input";
import { Button } from "../button";
import { useEventCallback } from "../../hooks";
import { Dialog } from "../dialog";

export type SelectValue = number | string | null;
type ChangeEventLike = {
  target: {
    value: SelectValue;
  };
};

type Props<O extends Option = Option> = {
  disabled?: boolean;
  variant?: "normal" | "ghost";
  showArrow?: boolean;
  selectionClassName?: string;
  width?: number | string;
  floatingMinWidth?: number;
  placement?: Placement;
  options: O[];
  placeholder?: string;
  getSearchableValue?: (matchReg: RegExp, option: O) => string;
  searchable?: boolean;
  required?: boolean;
  selectOptionComponent?: (props: O) => ReactNode;
  selectSelectionComponent?: (props: SelectSelectionProps<O>) => ReactNode;
  value?: SelectValue;
  onChange: ((e: ChangeEventLike) => void) | null;
  zIndex?: number;
};

function defaultGetSearchableValue(matchReg: RegExp, option: Option) {
  return matchReg.test(option.label.toLowerCase().trim());
}

export const Select = forwardRef<HTMLDivElement, Props>(
  (
    {
      variant = "normal",
      disabled = false,
      showArrow = true,
      selectionClassName,
      width = "100%",
      floatingMinWidth = 130,
      placement = "bottom",
      searchable = false,
      required = true,
      value = null,
      onChange,
      placeholder = "Select ...",
      getSearchableValue,
      selectSelectionComponent: SelectSelectionCustomComponent,
      selectOptionComponent: SelectOptionCustomComponent,
      options = [],
      zIndex,
    },
    propRef,
  ) => {
    const onChangeStable = useEventCallback(onChange);

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

    if (value !== null) {
      const pos = filteredOptions.findIndex((o) => o.value === value);
      if (pos !== -1) {
        selectedIndex = pos;
      }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchHasFocus, setSearchHasFocus] = useState(false);

    const SelectSelectionComponent =
      SelectSelectionCustomComponent ?? SelectSelection;

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
              width: `${Math.max(floatingMinWidth, rects.reference.width)}px`,
            });
            const firstChild = elements.floating
              .firstElementChild as HTMLElement;
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

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([listNav, typeahead, click, dismiss, role]);

    useEffect(() => {
      if (SelectOptionCustomComponent) {
        return;
      }
      filteredOptions.map((option, i) => {
        labelsRef.current[i] = option.label;
      });
    }, [search, filteredOptions, SelectOptionCustomComponent]);

    const handleSelect = useCallback(
      (index: number | null) => {
        setIsOpen(false);
        setSearch("");

        const event: ChangeEventLike = {
          target: {
            value: index === null ? null : filteredOptions[index].value,
          },
        };
        onChangeStable(event);
      },
      [onChangeStable, filteredOptions],
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

    const showCancelButton = !required && selectedIndex !== null;

    return (
      <div>
        <div
          className={clsx(
            // "selection",
            "flex cursor-pointer rounded-2xl outline outline-1 outline-offset-[-1px] hover:outline-gray-3 focus-full:outline-2 focus-full:outline-yellow-4",
            variant === "normal" ? "outline-gray-2" : "outline-transparent",
            selectionClassName,
            isOpen && "focus",
            disabled && "disabled",
          )}
          ref={ref}
          tabIndex={0}
          style={{
            width: typeof width === "number" ? `${width}px` : width,
          }}
          {...getReferenceProps()}
        >
          <span className={clsx("flex h-8 flex-1 items-center px-2")}>
            {selectedIndex !== null ? (
              <SelectSelectionComponent
                {...filteredOptions[selectedIndex]}
                key={selectedIndex}
              />
            ) : (
              placeholder
            )}
          </span>
          {showCancelButton && (
            <Button
              withRipple={false}
              icon
              variant="text"
              color="gray"
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
          {!showCancelButton && showArrow && (
            <Button
              color="gray"
              withRipple={false}
              icon
              variant="text"
              focusable={false}
            >
              <i className={isOpen ? "fe-angle-up" : "fe-angle-down"}></i>
            </Button>
          )}
        </div>
        <FloatingPortal>
          <SelectContext.Provider value={selectContext}>
            {isOpen && (
              <FloatingFocusManager context={context} modal={false}>
                <div
                  className="z-dialog outline-none"
                  data-testid="select-list"
                  ref={refs.setFloating}
                  style={{
                    ...floatingStyles,
                    zIndex,
                  }}
                  {...getFloatingProps()}
                >
                  <Dialog
                    placement={context.placement}
                    className="max-h-80 overflow-auto motion-safe:animate-fade-in-list"
                  >
                    {searchable && (
                      <div className="p-2">
                        <Input
                          color="gray"
                          placeholder="Search"
                          tabIndex={selectedIndex === null ? 0 : -1}
                          value={search}
                          onChange={handleSearchChange}
                          onFocus={() => setSearchHasFocus(true)}
                          onBlur={() => setSearchHasFocus(false)}
                        ></Input>
                      </div>
                    )}
                    {SelectOptionCustomComponent ? (
                      <FloatingList elementsRef={listRef} labelsRef={labelsRef}>
                        {filteredOptions.map((option) => (
                          <SelectOptionCustomComponent
                            {...option}
                            key={option.value}
                          />
                        ))}
                      </FloatingList>
                    ) : (
                      filteredOptions.map((option, index) => {
                        const isActive = activeIndex === index;
                        const isSelected = selectedIndex === index;

                        return (
                          <button
                            key={option.value}
                            className={clsx(
                              "option",
                              isSelected
                                ? "bg-gray-2"
                                : isActive && "bg-gray-1",
                            )}
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
                  </Dialog>
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
) as <O extends Option>(
  p: Props<O> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
