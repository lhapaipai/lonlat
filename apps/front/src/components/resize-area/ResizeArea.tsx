import { ComponentProps, RefObject, useCallback, useEffect } from "react";
import clsx from "clsx";
import { useEventCallback } from "pentatrion-design";

interface Props extends ComponentProps<"div"> {
  name: string;
  position: "top" | "bottom" | "left" | "right";
  initialValue?: number;
  container?: RefObject<HTMLDivElement>;
}

export function ResizeArea({
  name,
  position,
  initialValue,
  className,
  container,
  ...rest
}: Props) {
  useEffect(() => {
    const cssVarName = `--sidebar-${name}-${["top", "bottom"].includes(position) ? "height" : "width"}`;
    if (initialValue) {
      document.documentElement.style.setProperty(
        cssVarName,
        `${initialValue}px`,
      );
    }
    // we want to set the initial value, we don't want this value to be updated after
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cssVarName = `--sidebar-${name}-${["top", "bottom"].includes(position) ? "height" : "width"}`;
    return () => {
      // some cleanup
      document.documentElement.style.removeProperty(cssVarName);
    };
  }, [name, position]);

  const handlePointerMove = useEventCallback(
    (e: MouseEvent | TouchEvent) => {
      console.log("handlePointerMove", e);

      const compatibleEvt = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0]
        : (e as MouseEvent);

      const cssVarName = `--sidebar-${name}-${["top", "bottom"].includes(position) ? "height" : "width"}`;
      let cssVarValue;

      const containerRect = (
        container?.current || document.documentElement
      ).getBoundingClientRect();
      switch (position) {
        case "top":
          cssVarValue = containerRect.bottom - compatibleEvt.pageY;
          break;
        case "right":
          cssVarValue = compatibleEvt.pageX - containerRect.left;
          break;
        case "left":
          cssVarValue = containerRect.right - compatibleEvt.pageX;
          break;
        case "bottom":
          cssVarValue = compatibleEvt.pageY - containerRect.top;
          break;
      }
      document.documentElement.style.setProperty(
        cssVarName,
        `${cssVarValue}px`,
      );
      return () => {
        document.documentElement.style.removeProperty(cssVarName);
      };
    },
    // 500,
    // [name, position, container],
  );

  const handlePointerUp = useCallback(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    document.removeEventListener(
      isTouchDevice ? "touchmove" : "pointermove",
      handlePointerMove,
    );
    document.documentElement.classList.remove(
      "cursor-row-resize",
      "cursor-col-resize",
    );
  }, [handlePointerMove]);

  function handlePointerDown() {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    document.addEventListener(
      isTouchDevice ? "touchend" : "pointerup",
      handlePointerUp,
      { once: true },
    );
    document.addEventListener(
      isTouchDevice ? "touchmove" : "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );
    if (["top", "bottom"].includes(position)) {
      document.documentElement.classList.add(`cursor-row-resize`);
    } else {
      document.documentElement.classList.add(`cursor-col-resize`);
    }
  }

  return (
    <div className={clsx(["p8n-resize-area", position, className])} {...rest}>
      <button
        onTouchStart={handlePointerDown}
        className="absolute left-1/2 flex h-8 w-full -translate-x-1/2 items-center justify-center md:hidden"
      >
        <span className="relative mx-auto h-1 w-12 rounded-sm bg-gray-2"></span>
      </button>
      <button
        className="area-button"
        type="button"
        onPointerDown={handlePointerDown}
      ></button>
    </div>
  );
}
