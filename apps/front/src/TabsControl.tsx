import { useRControl } from "maplibre-react-components";
import { Button, Tabs } from "pentatrion-design";
import { createPortal } from "react-dom";
import SearchTab from "~/features/search/SearchTab";
import DirectionTab from "~/features/direction/DirectionTab";
import { useAppDispatch, useAppSelector } from "./store";
import {
  distractionFreeChanged,
  selectDistractionFree,
  selectTab,
  tabChanged,
} from "./store/mapSlice";
import { memo } from "react";
import cn from "classnames";
import HelpTab from "./components/HelpTab";

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
      title: (
        <span className="px-6 inline-block">
          <i className="fe-search"></i>
        </span>
      ),
      content: <SearchTab />,
    },
    {
      id: "direction",
      title: (
        <span className="px-6 inline-block">
          <i className="fe-route"></i>
        </span>
      ),
      content: <DirectionTab />,
    },
    {
      id: "help",
      title: (
        <span className="px-6 inline-block">
          <i className="fe-info"></i>
        </span>
      ),
      content: <HelpTab />,
    },
  ];

  return createPortal(
    <>
      <Tabs
        fullWidth={false}
        tabs={tabs}
        value={tab}
        onChange={(e) => dispatch(tabChanged(e))}
        contentClassName="overflow-auto max-h-[calc(100vh-36px-1rem)]"
      >
        <Button
          onClick={() => dispatch(distractionFreeChanged(true))}
          icon
          variant="ghost"
          color="gray"
        >
          <i className="fe-sidebar-collapse"></i>
        </Button>
      </Tabs>
      {distractionFree && (
        <div className="expand-all absolute top-2 right-[calc(100%+1rem)] md:top-0 md:right-[calc(100%+0.5rem)]">
          <Button
            icon
            variant="ghost"
            color="gray"
            onClick={() => dispatch(distractionFreeChanged(false))}
          >
            <img
              width="32"
              height="32"
              src="/logo-1x.png"
              srcSet="/logo-1x.png 1x, /logo-2x.png 2x"
              alt="LonLat logo"
              className="w-8 h-8 max-w-none"
            />
          </Button>
        </div>
      )}
    </>,
    container,
  );
}

export default memo(TabsControl);
