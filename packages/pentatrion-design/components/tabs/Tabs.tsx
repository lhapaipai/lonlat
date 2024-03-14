import { ReactNode } from "react";
import cn from "classnames";

import "./Tabs.scss";

/* TODO: fix stickyTabs with overflow: hidden */

export interface Tab {
  title: string;
  content?: ReactNode;
}

interface Props {
  tabs?: Tab[];
  value: number;
  /**
   * Will make tabs stick to the top of the container when overflowing
   */
  stickyTabs?: boolean;
  /**
   * Tabs will take the maximum width and divide equally
   */
  fullWidth?: boolean;
  onChange: (index: number) => void;
}

export default function Tabs({
  tabs = [],
  value,
  onChange,
  fullWidth = false,
  stickyTabs = false,
}: Props) {
  const content = tabs[value]?.content;

  return (
    <div className="ll-tabs rounded-sm">
      <ul
        role="tablist"
        className={cn("tabs-list", fullWidth && "full-width", stickyTabs && "sticky-top")}
      >
        {tabs.map(({ title }, index) => {
          return (
            <li key={title} className={cn("tabs-list-item", value === index && "selected")}>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  onChange(index);
                }}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="tabs-content">{content}</div>
    </div>
  );
}
