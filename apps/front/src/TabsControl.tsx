import { useRControl } from "maplibre-react-components";
import { Button, Tabs } from "pentatrion-design";
import { createPortal } from "react-dom";
import SearchTab from "./search/SearchTab";
import DirectionTab from "./direction/DirectionTab";
import { useAppDispatch, useAppSelector } from "./store";
import {
  distractionFreeChanged,
  selectDistractionFree,
  selectTab,
  tabChanged,
} from "./store/mapSlice";
import { memo } from "react";
import cn from "classnames";
import "./TabsControl.scss";

function TabsControl() {
  const distractionFree = useAppSelector(selectDistractionFree);
  const container = useRControl({
    position: "top-right",
    className: cn("maplibregl-ctrl maplibregl-ctrl-tabs", distractionFree && "distraction-free"),
  });
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
    <>
      <Tabs fullWidth={false} tabs={tabs} value={tab} onChange={(e) => dispatch(tabChanged(e))}>
        <Button
          onClick={() => dispatch(distractionFreeChanged(true))}
          icon
          variant="ghost"
          color="weak"
        >
          <i className="fe-sidebar-collapse"></i>
        </Button>
      </Tabs>
      {distractionFree && (
        <div className="expand-all">
          <Button
            icon
            variant="light"
            color="weak"
            onClick={() => dispatch(distractionFreeChanged(false))}
          >
            <i className="fe-menu"></i>
          </Button>
        </div>
      )}
    </>,
    container,
  );
}

export default memo(TabsControl);
