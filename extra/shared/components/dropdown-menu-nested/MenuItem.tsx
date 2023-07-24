import { useFloatingTree, useListItem, useMergeRefs } from "@floating-ui/react";
import { ButtonHTMLAttributes, FocusEvent, MouseEvent, forwardRef, useContext } from "react";
import { MenuContext } from "./MenuContext";

interface Props {
  label: string;
  disabled?: boolean;
}

const MenuItem = forwardRef<HTMLButtonElement, Props & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ label, disabled, ...props }, forwardedRef) => {
    const menu = useContext(MenuContext);
    const item = useListItem({ label: disabled ? null : label });
    const tree = useFloatingTree();
    const isActive = item.index === menu.activeIndex;

    return (
      <button
        {...props}
        ref={useMergeRefs([item.ref, forwardedRef])}
        type="button"
        role="menuitem"
        className="option"
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        {...menu.getItemProps({
          onClick(event: MouseEvent<HTMLButtonElement>) {
            props.onClick?.(event);
            tree?.events.emit("click");
          },
          onFocus(event: FocusEvent<HTMLButtonElement>) {
            props.onFocus?.(event);
            menu.setHasFocusInside(true);
          },
        })}
      >
        {label}
      </button>
    );
  },
);

export default MenuItem;
