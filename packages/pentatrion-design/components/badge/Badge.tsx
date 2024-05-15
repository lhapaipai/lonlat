import { ReactNode } from "react";
import { ThemeColor } from "../../types";
import clsx from "clsx";
import { buttonVariants } from "../button/Button";
import Href from "../href/Href";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
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
        "text-xs rounded-full w-fit shadow overflow-hidden inline-flex items-stretch",
        buttonVariants.variant.contained(color),
        // badgeVariants.color[color],
        // `variant-solid-${color}`,
        // `text-${color}-4`,
        className,
      )}
    >
      {onClick ? (
        <button className="px-2" onClick={onClick}>
          {children}
        </button>
      ) : (
        <span className="px-2">{children}</span>
      )}
      {onRemove && (
        <button className="remove rounded-r-full pr-1 pl-0.5" onClick={onRemove}>
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
