import { ReactNode } from "react";
import clsx from "clsx";

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
    <div className={clsx("ll-tabs", "rounded-sm", className)}>
      <div
        role="tablist"
        className={clsx("tabs-list", fullWidth && "full-width", stickyTabs && "sticky z-[1] top-0")}
      >
        {tabs.map(({ title, id }) => {
          return (
            <div key={id} className={clsx("tabs-list-item", value === id && "selected")}>
              <button
                className="variant-solid-yellow"
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
