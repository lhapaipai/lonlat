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
  useTransitionStatus,
} from "@floating-ui/react";
import { AutocompleteContext } from "./useAutocompleteContext.ts";
import "./Autocomplete.scss";
import "../button/Button.scss";
import cn from "classnames";
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
  placement = "bottom-start",
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
            height: "100%",
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

  const transitionStatus = useTransitionStatus(context, {
    duration: 250,
  });

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
            onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
              if (e.key === "Enter" && activeIndex != null) {
                handleSelect(activeIndex);
              }
            },
          })}
        />

        {/* {suffix && <div className="mr-2 flex-center adornment">{suffix}</div>} */}
      </div>
      <FloatingPortal>
        <AutocompleteContext.Provider value={autocompleteContext}>
          {transitionStatus.isMounted && (
            <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
              <div
                className={cn("ll-dialog", "ll-autocomplete-dialog")}
                data-status={transitionStatus.status}
                ref={refs.setFloating}
                style={floatingStyles}
              >
                <div className="box" {...getFloatingProps()}>
                  <FloatingList elementsRef={listRef}>
                    {options.map((option) => (
                      <OptionComponent option={option} key={option.value} />
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
