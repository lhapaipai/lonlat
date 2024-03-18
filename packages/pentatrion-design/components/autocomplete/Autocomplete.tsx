import { ChangeEvent, KeyboardEvent, useCallback, useMemo, useRef, useState } from "react";
import type { Option } from "../..";
import AutocompleteOption from "./AutocompleteOption.tsx";
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  Placement,
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import { AutocompleteContext } from "./useAutocompleteContext.ts";
import "./Autocomplete.scss";
import "../button/Button.scss";
import cn from "classnames";
import { Button, Loader, useEventCallback } from "../..";

export interface AutocompleteProps<O extends Option> {
  icon?: boolean | string;

  placement?: Placement;
  placeholder?: string;
  /**
   * search string used as value for <input>
   */
  searchValue: string;
  /**
   * change handler when typing in the input
   * or when clicking on an option (the label value is passed)
   */
  onChangeSearchValue: (value: string, selectionLabel: boolean) => void;

  selection?: O | null;
  /**
   * select handler for a selection from the autocomplete's dropdown
   * the option object is passed when clicking on an option
   * null value is passed when typing a new character in the input search.
   */
  onChangeSelection: (option: O | null) => void;
  options: O[];

  AutocompleteOptionCustom?: typeof AutocompleteOption<O>;

  loading?: boolean;
}

export default function Autocomplete<O extends Option = Option>({
  icon = true,
  placeholder = "Search...",
  searchValue,
  onChangeSearchValue,
  selection = null,
  onChangeSelection,
  options,
  placement = "bottom",
  AutocompleteOptionCustom,
  loading = false,
}: AutocompleteProps<O>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onChangeSearchValueStable = useEventCallback(onChangeSearchValue);
  const onChangeSelectionStable = useEventCallback(onChangeSelection);

  const OptionComponent = AutocompleteOptionCustom ?? AutocompleteOption;

  const listRef = useRef<Array<HTMLElement | null>>([]);

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

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    /* we want the real focus to stay on the input, so focus associated to active items is simulated */
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    role,
    dismiss,
    listNav,
  ]);

  function handleChangeSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value !== searchValue && selection !== null) {
      onChangeSelectionStable(null);
    }

    onChangeSearchValueStable(value, false);

    if (value) {
      setIsOpen(true);
      setActiveIndex(0);
    } else {
      setIsOpen(false);
    }
  }

  const handleSelect = useCallback(
    (index: number | null) => {
      if (index === null) {
        onChangeSelectionStable(null);
      } else if (options[index]) {
        const newSelection = options[index];
        onChangeSelectionStable(newSelection);
        onChangeSearchValueStable(newSelection.label, true);
      }
      setActiveIndex(null);
      setIsOpen(false);
    },

    [options, onChangeSelectionStable, onChangeSearchValueStable],
  );

  const autocompleteContext = useMemo(
    () => ({
      activeIndex,
      selection,
      getItemProps,
      handleSelect,
    }),
    [activeIndex, selection, getItemProps, handleSelect],
  );

  return (
    <div className="ll-autocomplete">
      <div className={cn("ll-input")} ref={refs.setReference}>
        {icon !== false && (
          <div className="ml-2 flex-center adornment">
            {icon === true ? <i className="fe-search"></i> : <i className={icon}></i>}
            {loading && <Loader size="medium" color="weak" />}
          </div>
        )}
        <input
          className={cn("input-element")}
          type="search"
          value={searchValue}
          placeholder={placeholder}
          aria-autocomplete="list"
          {...getReferenceProps({
            onChange: handleChangeSearchValue,
            onMouseDown() {
              if (options.length === 0) {
                return;
              }
              /**
               * There is a already selection
               * and the only element available is the selection,
               * no need to display the dropdown.
               */
              if (options.length === 1 && options[0].value === selection?.value) {
                return;
              }
              setIsOpen((isOpen) => !isOpen);
            },
            onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
              if (e.key === "Enter" && activeIndex != null) {
                handleSelect(activeIndex);
              }
            },
          })}
        />
        <div className="flex-center adornment">
          {(searchValue.trim() !== "" || selection !== null) && (
            <Button
              withRipple={false}
              icon
              shape="underline"
              onClick={() => {
                setIsOpen(false);
                onChangeSelectionStable(null);
                setActiveIndex(null);
                onChangeSearchValueStable("", true);
              }}
            >
              <i className="fe-cancel"></i>
            </Button>
          )}
          {icon === false && loading && <Loader size="medium" color="weak" />}
        </div>
      </div>
      <FloatingPortal>
        <AutocompleteContext.Provider value={autocompleteContext}>
          {isOpen && (
            <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
              <div
                className={cn("ll-portail-dialog")}
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <div
                  className={cn(
                    "ll-dialog",
                    "ll-autocomplete-dialog",
                    `placement-${context.placement}`,
                    "ll-animate",
                    "fade-in-list",
                  )}
                >
                  <FloatingList elementsRef={listRef}>
                    {options.map((option) => (
                      <OptionComponent {...option} searchValue={searchValue} key={option.value} />
                    ))}
                  </FloatingList>
                </div>
              </div>
            </FloatingFocusManager>
          )}
        </AutocompleteContext.Provider>
      </FloatingPortal>
    </div>
  );
}
