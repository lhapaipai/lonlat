import { ReactNode } from "react";
import cn from "classnames";

import "./Tabs.scss";

/* TODO: fix stickyTabs with overflow: hidden */

export interface Tab {
  id: string | number;
  title: ReactNode;
  content?: ReactNode;
}

interface Props {
  tabs?: Tab[];
  value: number | string;
  /**
   * Will make tabs stick to the top of the container when overflowing
   */
  stickyTabs?: boolean;
  /**
   * Tabs will take the maximum width and divide equally
   */
  fullWidth?: boolean;
  onChange: (id: number | string) => void;
}

export default function Tabs({
  tabs = [],
  value,
  onChange,
  fullWidth = false,
  stickyTabs = false,
}: Props) {
  const content = tabs.find((t) => t.id === value)?.content;

  return (
    <div className="ll-tabs rounded-sm">
      <ul
        role="tablist"
        className={cn("tabs-list", fullWidth && "full-width", stickyTabs && "sticky-top")}
      >
        {tabs.map(({ title, id }) => {
          return (
            <li key={id} className={cn("tabs-list-item", value === id && "selected")}>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  onChange(id);
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
