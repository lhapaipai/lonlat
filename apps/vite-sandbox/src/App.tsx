import "./App.scss";

// import { MenuItem, MenuItemWithChildren, DropdownMenu } from "./dropdown";

// import { ContextMenu, ContextMenuItem } from "./context-menu";
import { Button, MenuItem, MenuItemWithChildren, DropdownMenu } from "@lonlat/shared/index";

function App() {
  return (
    <>
      {/* {<Dropdown>
        <DropdownTrigger>
          <Button>open menu !</Button>
        </DropdownTrigger>
        <DropdownContent>
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
        </DropdownContent>
      </Dropdown>} */}

      {/* <ContextMenu>
        <ContextMenuItem label="Back" onClick={() => console.log("Back")} />
        <ContextMenuItem label="Forward" />
        <ContextMenuItem label="Reload" disabled />
        <ContextMenuItem label="Save As..." />
        <ContextMenuItem label="Print" />
      </ContextMenu> */}

      <DropdownMenu label="Edit" triggerComponent={Button}>
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
      </DropdownMenu>

      {/* <Menu>
        <MenuTrigger>Edit</MenuTrigger>
        <MenuContent>
          <MenuItem label="a"></MenuItem>
          <MenuItem label="b"></MenuItem>
          <MenuItem label="c">
            <MenuItem label="c-1"></MenuItem>
            <MenuItem label="c-2"></MenuItem>
            <MenuItem label="c-3"></MenuItem>
          </MenuItem>
        </MenuContent>
      </Menu> */}
    </>
  );
}

export default App;
