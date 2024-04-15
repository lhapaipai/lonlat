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

  children?: ReactNode;

  className?: string;
}

export default function Tabs({
  className,
  tabs = [],
  value,
  onChange,
  fullWidth = false,
  stickyTabs = false,
  children,
}: Props) {
  const content = tabs.find((t) => t.id === value)?.content;
  return (
    <div className={cn("ll-tabs", "rounded-sm", className)}>
      <div
        role="tablist"
        className={cn("tabs-list", fullWidth && "full-width", stickyTabs && "sticky-top")}
      >
        {tabs.map(({ title, id }) => {
          return (
            <div key={id} className={cn("tabs-list-item", value === id && "selected")}>
              <button
                className="variant-solid-primary"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  onChange(id);
                }}
              >
                {title}
              </button>
            </div>
          );
        })}
        {children && <div className="extra">{children}</div>}
      </div>
      <div className="tabs-content">{content}</div>
    </div>
  );
}
