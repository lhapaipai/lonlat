import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import { FocusEvent, forwardRef, useContext, useEffect, useRef, useState } from "react";
import { MenuContext } from "./MenuContext";
import { Button } from "../..";
import cn from "classnames";
import { type Props as ButtonProps } from "pentatrion-design/components/button/Button";

export interface Props extends ButtonProps {
  label?: string;
  triggerComponent?: typeof Button;
}

export const MenuItemWithChildren = forwardRef<HTMLButtonElement, Props>(
  ({ children, label, triggerComponent: TriggerComponent = Button, ...props }, forwardedRef) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasFocusInside, setHasFocusInside] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const labelsRef = useRef<Array<string | null>>([]);
    const parent = useContext(MenuContext);

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const item = useListItem();

    const isNested = parentId != null;

    const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
      nodeId,
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: isNested ? "right-start" : "bottom-start",
      middleware: [
        offset({ mainAxis: isNested ? -1 : 10, alignmentAxis: isNested ? 0 : 0 }),
        flip(),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
    });

    const hover = useHover(context, {
      enabled: isNested,
      delay: { open: 75 },
      handleClose: safePolygon({ blockPointerEvents: true }),
    });
    const click = useClick(context, {
      event: "mousedown",
      toggle: !isNested,
      ignoreMouse: isNested,
    });
    const role = useRole(context, { role: "menu" });
    const dismiss = useDismiss(context, { bubbles: true });
    const listNavigation = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      nested: isNested,
      onNavigate: setActiveIndex,
    });
    const typeahead = useTypeahead(context, {
      listRef: labelsRef,
      onMatch: isOpen ? setActiveIndex : undefined,
      activeIndex,
    });
    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
      hover,
      click,
      role,
      dismiss,
      listNavigation,
      typeahead,
    ]);

    useEffect(() => {
      if (!tree) return;

      function handleTreeClick() {
        setIsOpen(false);
      }

      function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
        // close sibling menu
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          setIsOpen(false);
        }
      }

      tree.events.on("click", handleTreeClick);
      tree.events.on("menuopen", onSubMenuOpen);

      return () => {
        tree.events.off("click", handleTreeClick);
        tree.events.off("menuopen", onSubMenuOpen);
      };
    }, [tree, nodeId, parentId]);

    useEffect(() => {
      if (isOpen && tree) {
        tree.events.emit("menuopen", { parentId, nodeId });
      }
    }, [tree, isOpen, nodeId, parentId]);

    const ref = useMergeRefs([refs.setReference, item.ref, forwardedRef]);

    return (
      <FloatingNode id={nodeId}>
        {isNested ? (
          <button
            ref={ref}
            tabIndex={parent.activeIndex === item.index ? 0 : -1}
            role="menuitem"
            data-open={isOpen ? "" : undefined}
            data-nested=""
            data-focus-inside={hasFocusInside ? "" : undefined}
            {...getReferenceProps(
              parent.getItemProps({
                onFocus(event: FocusEvent<HTMLButtonElement>) {
                  props.onFocus?.(event);
                  setHasFocusInside(false);
                  parent.setHasFocusInside(true);
                },
              }),
            )}
            className={cn(
              isNested && "option",
              !isNested && !TriggerComponent && "ll-dropdown-menu-trigger",
            )}
          >
            <span>{label}</span>

            <span className="next-icon ml-auto">
              <i className="fe-angle-right" aria-hidden></i>
            </span>
          </button>
        ) : (
          <TriggerComponent
            ref={ref}
            data-open={isOpen ? "" : undefined}
            data-focus-inside={hasFocusInside ? "" : undefined}
            {...props}
            {...getReferenceProps(
              parent.getItemProps({
                onFocus(event: FocusEvent<HTMLButtonElement>) {
                  props.onFocus?.(event);
                  setHasFocusInside(false);
                  parent.setHasFocusInside(true);
                },
              }),
            )}
            className={cn(
              isNested && "option",
              !isNested && !TriggerComponent && "ll-dropdown-menu-trigger",
            )}
          >
            {label}
          </TriggerComponent>
        )}

        <MenuContext.Provider
          value={{ activeIndex, setActiveIndex, getItemProps, setHasFocusInside, isOpen }}
        >
          {isOpen && (
            <FloatingPortal>
              <FloatingFocusManager
                context={context}
                modal={false}
                initialFocus={isNested ? -1 : 0}
                returnFocus={!isNested}
              >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  <div
                    ref={refs.setFloating}
                    className={cn("ll-dialog", "ll-dropdown-menu-nested")}
                    style={floatingStyles}
                  >
                    <div className="box" {...getFloatingProps()}>
                      {children}
                    </div>
                  </div>
                </FloatingList>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </MenuContext.Provider>
      </FloatingNode>
    );
  },
);

export default MenuItemWithChildren;
