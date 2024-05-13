import { ReactNode } from "react";
import "./Badge.scss";
import { ThemeColor } from "../../types";
import clsx from "clsx";
import { Href, Tooltip, TooltipContent, TooltipTrigger } from "../..";
interface Props {
  children: ReactNode;
  className?: string;
  tooltip?: string;
  url?: string;
  color?: ThemeColor;
  onClick?: () => void;
  onRemove?: () => void;
}

export default function Badge({
  children,
  className,
  onRemove,
  onClick,
  tooltip,
  url,
  color = "yellow",
}: Props) {
  const badge = (
    <span
      className={clsx(
        "ll-badge",
        "text-xs",
        `variant-solid-${color}`,
        `text-${color}-4`,
        className,
      )}
    >
      {onClick ? (
        <button className="inner" onClick={onClick}>
          {children}
        </button>
      ) : (
        <span className="inner">{children}</span>
      )}
      {onRemove && (
        <button className="remove" onClick={onRemove}>
          <i className="fe-cancel"></i>
        </button>
      )}
    </span>
  );
  const wrappedBadge = url ? (
    <Href href={url} ghost={true}>
      {badge}
    </Href>
  ) : (
    badge
  );

  if (!tooltip) {
    return wrappedBadge;
  }

  return (
    <Tooltip>
      <TooltipContent>{tooltip}</TooltipContent>
      <TooltipTrigger asChild={true}>{wrappedBadge}</TooltipTrigger>
    </Tooltip>
  );
}
