import { Placement, Side, UseFloatingReturn } from "@floating-ui/react";

function getSide(placement: Placement): Side {
  return placement.split("-")[0] as Side;
}

export function computeArrowStyle({ middlewareData, placement }: UseFloatingReturn) {
  if (!middlewareData.arrow) {
    return {
      display: "none",
    };
  }

  const { x, y } = middlewareData.arrow;
  const staticSide: "bottom" | "left" | "top" | "right" = (
    {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    } as const
  )[getSide(placement)];

  return {
    left: x != null ? `${x}px` : "",
    top: y != null ? `${y}px` : "",
    [staticSide]: "-6px",
  };
}
