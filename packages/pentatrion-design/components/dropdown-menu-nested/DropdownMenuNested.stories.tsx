import { DropdownMenuNested, MenuItem, MenuItemWithChildren, Button } from "~design";
import { Meta } from "@storybook/react";

const meta = {
  title: "Components/DropdownMenuNested",
  component: DropdownMenuNested,
} satisfies Meta<typeof DropdownMenuNested>;
export default meta;

export const Basic = () => (
  <DropdownMenuNested label="Edit" triggerComponent={Button} type="yellow">
    <MenuItem label="Undo" onClick={() => console.log("Undo")} />
    <MenuItem label="Redo" disabled />
    <MenuItem label="Cut" />
    <MenuItemWithChildren label="Copy as">
      <MenuItem label="Text" />
      <MenuItem label="Video" />
      <MenuItemWithChildren label="Image">
        <MenuItem label=".png" />
        <MenuItem label=".jpg" />
        <MenuItem label=".svg" />
        <MenuItem label=".gif" />
      </MenuItemWithChildren>
      <MenuItem label="Audio" />
    </MenuItemWithChildren>
    <MenuItemWithChildren label="Share">
      <MenuItem label="Mail" />
      <MenuItem label="Instagram" />
    </MenuItemWithChildren>
  </DropdownMenuNested>
);
