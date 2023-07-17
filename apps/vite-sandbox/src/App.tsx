import {
  SimpleTooltip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverDescription,
  PopoverFooter,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalContent,
  ModalTrigger,
  ModalDescription,
} from "@lonlat/shared";
import "./App.scss";
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function App() {
  const context = useContext(ThemeContext);
  console.log(context);
  return (
    <div id="my-app">
      <SimpleTooltip content="infos" placement="bottom">
        dessous
      </SimpleTooltip>
      <div style={{ width: "200px", height: "200px" }}></div>
      <Modal>
        <ModalTrigger>Modal Trigger</ModalTrigger>
        <ModalContent className="Modal">
          <ModalHeader>I opened automatically</ModalHeader>
          <ModalDescription>After 2 seconds</ModalDescription>
          <ModalFooter>Close</ModalFooter>
        </ModalContent>
      </Modal>
      <div style={{ width: "200px", height: "200px" }}></div>
      <Popover type="primary">
        <PopoverTrigger>My trigger</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Heading</PopoverHeader>
          <PopoverDescription>description</PopoverDescription>
          <PopoverFooter>Close</PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default App;
