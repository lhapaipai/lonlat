import { forwardRef } from "react";
import { MenuItemWithChildren } from ".";
import { FloatingTree } from "@floating-ui/react";
import { Button, type ButtonProps } from "../button";

export interface Props extends ButtonProps {
  label: string;
  triggerComponent: typeof Button;
}

export const DropdownMenuNested = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <FloatingTree>
      <MenuItemWithChildren {...props} ref={ref} />
    </FloatingTree>
  );
});
