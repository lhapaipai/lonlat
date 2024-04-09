import { ReactNode } from "react";
import "./Badge.scss";
import { ThemeColor } from "../../types";
import cn from "classnames";
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
  color = "primary",
}: Props) {
  const badge = (
    <span
      className={cn("ll-badge", "text-xs", `variant-solid-${color}`, `color-${color}`, className)}
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
