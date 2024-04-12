import { useRControl } from "maplibre-react-components";
import { Tabs } from "pentatrion-design";
import { createPortal } from "react-dom";
import SearchTab from "./search/SearchTab";
import DirectionTab from "./direction/DirectionTab";
import { useAppDispatch, useAppSelector } from "./store";
import { selectTab, tabChanged } from "./store/mapSlice";
import { memo } from "react";

function TabsControl() {
  const container = useRControl("top-right", "maplibregl-ctrl maplibregl-ctrl-tabs");
  const tab = useAppSelector(selectTab);
  const dispatch = useAppDispatch();

  const tabs = [
    {
      id: "search",
      title: <i className="fe-search"></i>,
      content: <SearchTab />,
    },
    {
      id: "direction",
      title: <i className="fe-route"></i>,
      content: <DirectionTab />,
    },
  ];

  return createPortal(
    <Tabs fullWidth={true} tabs={tabs} value={tab} onChange={(e) => dispatch(tabChanged(e))} />,
    container,
  );
}

export default memo(TabsControl);
