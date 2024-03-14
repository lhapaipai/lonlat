import { forwardRef } from "react";
import MenuItemWithChildren from "./MenuItemWithChildren";
import { FloatingTree } from "@floating-ui/react";
import "./DropdownMenu.scss";
import { Button } from "pentatrion-design";
import { type Props as ButtonProps } from "pentatrion-design/components/button/Button";
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
