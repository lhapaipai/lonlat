import { useRControl } from "maplibre-react-components";
import { Button, Tabs } from "pentatrion-design";
import { createPortal } from "react-dom";
import SearchTab from "~/features/search/SearchTab";
import DirectionTab from "~/features/direction/DirectionTab";
import { useAppDispatch, useAppSelector } from "./store";
import {
  distractionFreeChanged,
  modeChangedAction,
  selectDistractionFree,
  selectMode,
  selectTab,
  tabChanged,
} from "./store/mapSlice";
import { memo } from "react";
import clsx from "clsx";
import HelpTab from "./components/HelpTab";

function TabsControl() {
  const distractionFree = useAppSelector(selectDistractionFree);
  const mode = useAppSelector(selectMode);

  const { container } = useRControl({
    position: "top-right",
    className: clsx(
      "maplibregl-ctrl maplibregl-ctrl-tabs",
      distractionFree && "distraction-free",
    ),
  });
  const tab = useAppSelector(selectTab);
  const dispatch = useAppDispatch();

  const tabs = [
    {
      id: "search",
      title: (
        <span className="inline-block px-6">
          <i className="fe-search"></i>
        </span>
      ),
      content: <SearchTab />,
    },
    {
      id: "direction",
      title: (
        <span className="inline-block px-6">
          <i className="fe-route"></i>
        </span>
      ),
      content: <DirectionTab />,
    },
    {
      id: "help",
      title: (
        <span className="inline-block px-6">
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
        className="rounded-2xl"
      >
        <Button
          icon
          variant="ghost"
          color="gray"
          onClick={() =>
            dispatch(modeChangedAction(mode === "light" ? "dark" : "light"))
          }
        >
          <i className={mode === "light" ? "fe-dark" : "fe-light"}></i>
        </Button>
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
        <div className="absolute right-[calc(100%+1rem)] top-2 md:right-[calc(100%+0.5rem)] md:top-0">
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
              className="h-8 w-8 max-w-none"
            />
          </Button>
        </div>
      )}
    </>,
    container,
  );
}

export default memo(TabsControl);
