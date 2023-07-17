import { ReactNode } from "react";
import "./Badge.scss";
import { ColorType } from "../types";
import cn from "classnames";
import { Href, Tooltip, TooltipContent, TooltipTrigger } from "../..";
interface Props {
  children: ReactNode;
  className?: string;
  tooltip?: string;
  url?: string;
  type?: ColorType;
}

export default function Badge({ children, className, tooltip, url, type = "primary" }: Props) {
  const badge = (
    <span className={cn("ll-badge", "text-xs", `type-${type}`, className)}>{children}</span>
  );
  const wrappedBadge = url ? <Href href={url}>{badge}</Href> : badge;

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
