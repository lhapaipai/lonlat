import { useAppSelector } from "./store";
import { ContextMenuEventDispatcher } from "maplibre-react-components";
import { selectTab } from "./store/mapSlice";
import SearchContextMenu from "~/features/search/SearchContextMenu";
import DirectionContextMenu from "~/features/direction/DirectionContextMenu";
import { ReactElement, memo } from "react";

function ContextMenuManager() {
  const tab = useAppSelector(selectTab);

  let ContextMenuElement: ReactElement | null = null;
  switch (tab) {
    case "search":
      ContextMenuElement = <SearchContextMenu />;
      break;
    case "direction":
      ContextMenuElement = <DirectionContextMenu />;
      break;
  }

  if (!ContextMenuElement) {
    return null;
  }

  return <ContextMenuEventDispatcher>{ContextMenuElement}</ContextMenuEventDispatcher>;
}

export default memo(ContextMenuManager);
