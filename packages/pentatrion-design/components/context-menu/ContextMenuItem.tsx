import React, { ComponentPropsWithRef, forwardRef } from "react";

export type ContextMenuItemMouseEvent =
  | React.MouseEvent<HTMLButtonElement>
  | MouseEvent
  | CustomEvent
  | null;

export interface ContextMenuItemProps extends Omit<ComponentPropsWithRef<"button">, "onClick"> {
  label: string;
  disabled?: boolean;
  onClick?: (e: ContextMenuItemMouseEvent) => void;
}

const ContextMenuItem = forwardRef<HTMLButtonElement, ContextMenuItemProps>(
  ({ label, disabled, ...props }, ref) => {
    return (
      <button {...props} className="option" ref={ref} role="menuitem" disabled={disabled}>
        {label}
      </button>
    );
  },
);

export default ContextMenuItem;
