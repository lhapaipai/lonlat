import { ChangeEvent, KeyboardEvent, useCallback, useMemo, useRef, useState } from "react";
import type { Option } from "./interface.d.ts";
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
import { Button } from "../..";
interface Props<O extends Option> {
  placement?: Placement;
  placeholder?: string;
  /**
   * search string used as value for <input>
   */
  searchValue: string;
  /**
   * change handler when typing
   */
  onChangeSearchValue: (value: string) => void;

  selection?: O | null;
  /**
   * select handler for a selection from the autocomplete's dropdown
   */
  onChangeSelection: (option: O | null) => void;
  options: O[];

  AutocompleteOptionCustom?: typeof AutocompleteOption;
}

export default function Autocomplete<O extends Option = Option>({
  placeholder = "Search...",
  searchValue,
  onChangeSearchValue,
  selection = null,
  onChangeSelection,
  options,
  placement = "bottom",
  AutocompleteOptionCustom,
}: Props<O>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
            maxHeight: `${Math.min(availableHeight, 300)}px`,
            width: `${Math.max(130, rects.reference.width)}px`,
          });
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
      onChangeSelection(null);
    }

    onChangeSearchValue(value);

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
        onChangeSelection(null);
      } else if (options[index]) {
        const newSelection = options[index];
        onChangeSelection(newSelection);
        onChangeSearchValue(newSelection.label);
      }
      setActiveIndex(null);

      setIsOpen(false);
    },
    // TODO with SimpleAutocomplete onChangeSelection and onChangeSearchValue
    // are hooks instead useCallback ?
    [options, onChangeSelection, onChangeSearchValue],
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
        <div className="ml-2 flex-center adornment">
          <i className="fe-search"></i>
        </div>
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
               * the only element available is already the selection,
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
        {(searchValue.trim() !== "" || selection !== null) && (
          <Button
            withRipple={false}
            icon
            shape="ghost"
            onClick={() => {
              setIsOpen(false);
              onChangeSelection(null);
              setActiveIndex(null);
              onChangeSearchValue("");
              /**
               * if we don't put a delay all unfiltered options
               * will reappear for the duration of fade out.
               */
              // setTimeout(() => {
              //   onChangeSearchValue("");
              // }, TRANSITION_DURATION);
            }}
          >
            <i className="fe-cancel"></i>
          </Button>
        )}
      </div>
      <FloatingPortal>
        <AutocompleteContext.Provider value={autocompleteContext}>
          {isOpen && (
            <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
              <div
                className={cn()}
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <div
                  className={cn(
                    "ll-dialog",
                    "ll-portail-dialog",
                    "ll-autocomplete-dialog",
                    `placement-${context.placement}`,
                    "ll-animate",
                    "fade-in-list",
                  )}
                >
                  <FloatingList elementsRef={listRef}>
                    {options.map((option) => (
                      <OptionComponent
                        option={option}
                        searchValue={searchValue}
                        key={option.value}
                      />
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
