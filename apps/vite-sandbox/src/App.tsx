import {
  SimpleTooltip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeading,
  PopoverDescription,
  PopoverClose,
} from "@lonlat/shared";
import "./App.scss";
function App() {
  return (
    <div id="my-app">
      <SimpleTooltip content="infos" placement="bottom">
        dessous
      </SimpleTooltip>
      <div style={{ width: "200px", height: "200px" }}></div>
      <Popover type="primary">
        <PopoverTrigger>My trigger</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading>Heading</PopoverHeading>
          <PopoverDescription>description</PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default App;
