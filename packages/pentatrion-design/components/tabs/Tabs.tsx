import { ReactNode } from "react";
import clsx from "clsx";

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
    <div className={clsx("ll-tabs rounded-sm shadow bg-gray-2 overflow-hidden", className)}>
      <div role="tablist" className={clsx("tabs-list flex", stickyTabs && "sticky z-[1] top-0")}>
        {tabs.map(({ title, id }) => {
          return (
            <div
              key={id}
              className={clsx(
                "tabs-list-item border-t-4 hover:text-gray-7 transition-all",
                fullWidth && "text-center flex-1",
                value === id
                  ? "border-t-yellow-3 bg-gray-0 text-gray-7"
                  : "border-t-transparent text-gray-6",
              )}
            >
              <button
                className="p-2 focus-visible:outline-offset-0 w-full"
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
        {children && <div className="extra ml-auto mr-2 flex items-center">{children}</div>}
      </div>
      <div className="p-2 bg-gray-0 shadow">{content}</div>
    </div>
  );
}
