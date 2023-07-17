import { Dropdown, DropdownMenu, DropdownMenuButton, DropdownTrigger } from "@lonlat/shared";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

export const Basic = () => (
  <Dropdown>
    <DropdownTrigger>Click me</DropdownTrigger>
    <DropdownMenu label="Edit">
      <DropdownMenuButton label="Undo" onClick={() => console.log("Undo")} />
      <DropdownMenuButton label="Redo" disabled />
      <DropdownMenuButton label="Cut" />
      <DropdownMenu label="Copy as">
        <DropdownMenuButton label="Text" />
        <DropdownMenuButton label="Video" />
        <DropdownMenu label="Image">
          <DropdownMenuButton label=".png" />
          <DropdownMenuButton label=".jpg" />
          <DropdownMenuButton label=".svg" />
          <DropdownMenuButton label=".gif" />
        </DropdownMenu>
        <DropdownMenuButton label="Audio" />
      </DropdownMenu>
      <DropdownMenu label="Share">
        <DropdownMenuButton label="Mail" />
        <DropdownMenuButton label="Instagram" />
      </DropdownMenu>
    </DropdownMenu>
  </Dropdown>
);
