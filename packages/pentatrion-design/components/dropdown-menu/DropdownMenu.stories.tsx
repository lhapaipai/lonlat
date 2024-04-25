import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~design";
import { Meta } from "@storybook/react";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;
export default meta;

export const Basic = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => console.log("Undo")}>Your profile</DropdownMenuItem>
      <DropdownMenuItem disabled>Settings</DropdownMenuItem>
      <DropdownMenuItem>Sign out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
