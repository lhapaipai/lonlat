import { ContextMenu, ContextMenuItem } from "pentatrion-design";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    function handleContextMenu(e: MouseEvent) {
      console.log(e);
    }

    document.addEventListener("contextmenu", handleContextMenu);

    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <>
      <h1>React + Spring</h1>
      <input />
      <ContextMenu>
        <ContextMenuItem label="Back" onClick={() => console.log("Back")} />
        <ContextMenuItem label="Forward" />
        <ContextMenuItem label="Reload" disabled />
        <ContextMenuItem label="Save As..." />
        <ContextMenuItem label="Print" />
      </ContextMenu>
    </>
  );
}

export default App;
