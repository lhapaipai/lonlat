import React, { ComponentPropsWithRef, ReactNode, forwardRef } from "react";
import clsx from "clsx";

export type ContextMenuItemMouseEvent =
  | React.MouseEvent<HTMLButtonElement>
  | MouseEvent
  | CustomEvent
  | null;

export interface ContextMenuItemProps extends Omit<ComponentPropsWithRef<"button">, "onClick"> {
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: (e: ContextMenuItemMouseEvent) => void;
}

const ContextMenuItem = forwardRef<HTMLButtonElement, ContextMenuItemProps>(
  ({ label, disabled, icon, className, ...props }, ref) => {
    return (
      <button
        {...props}
        className={clsx(["option", className])}
        ref={ref}
        role="menuitem"
        disabled={disabled}
      >
        {icon}
        <span className="content">{label}</span>
      </button>
    );
  },
);

export default ContextMenuItem;
