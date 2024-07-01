import { ComponentProps, RefObject, useCallback, useEffect } from "react";
import clsx from "clsx";

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

  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      const cssVarName = `--sidebar-${name}-${["top", "bottom"].includes(position) ? "height" : "width"}`;
      let cssVarValue;

      const containerRect = (
        container?.current || document.documentElement
      ).getBoundingClientRect();
      switch (position) {
        case "top":
          cssVarValue = containerRect.bottom - e.pageY;
          break;
        case "right":
          cssVarValue = e.pageX - containerRect.left;
          break;
        case "left":
          cssVarValue = containerRect.right - e.pageX;
          break;
        case "bottom":
          cssVarValue = e.pageY - containerRect.top;
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
    [name, position, container],
  );

  const handlePointerUp = useCallback(() => {
    const handler = handlePointerMove;
    document.removeEventListener("pointermove", handler);
    document.documentElement.classList.remove(
      "cursor-row-resize",
      "cursor-col-resize",
    );

    return () => {
      document.removeEventListener("pointermove", handler);
    };
  }, [handlePointerMove]);

  function handlePointerDown() {
    document.addEventListener("pointerup", handlePointerUp, { once: true });
    document.addEventListener("pointermove", handlePointerMove);
    if (["top", "bottom"].includes(position)) {
      document.documentElement.classList.add(`cursor-row-resize`);
    } else {
      document.documentElement.classList.add(`cursor-col-resize`);
    }
  }

  return (
    <div className={clsx(["p8n-resize-area", position, className])} {...rest}>
      <button
        className="area-button"
        type="button"
        onPointerDown={handlePointerDown}
      ></button>
    </div>
  );
}
