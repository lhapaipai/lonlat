import { forwardRef } from "react";

interface Props {
  label: string;
  disabled?: boolean;
}

export const ContextMenuItem = forwardRef<HTMLButtonElement, Props>(
  ({ label, disabled, ...props }, ref) => {
    return (
      <button {...props} className="menu-item" ref={ref} role="menuitem" disabled={disabled}>
        {label}
      </button>
    );
  },
);
