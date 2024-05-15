import { forwardRef } from "react";
import MenuItemWithChildren from "./MenuItemWithChildren";
import { FloatingTree } from "@floating-ui/react";
import { Button, type ButtonProps } from "../button";

export interface Props extends ButtonProps {
  label: string;
  triggerComponent: typeof Button;
}

const DropdownMenuNested = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <FloatingTree>
      <MenuItemWithChildren {...props} ref={ref} />
    </FloatingTree>
  );
});

export default DropdownMenuNested;
