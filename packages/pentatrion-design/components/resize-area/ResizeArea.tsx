import { useCallback, useEffect } from "react";
import clsx from "clsx";

interface Props {
  name: string;
  position: "top" | "bottom" | "left" | "right";
  initialValue?: number;
}

export function ResizeArea({ name, position, initialValue }: Props) {
  useEffect(() => {
    const cssVarName = `--sidebar-${name}-${["top", "bottom"].includes(position) ? "height" : "width"}`;
    if (initialValue) {
      document.documentElement.style.setProperty(cssVarName, `${initialValue}px`);
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
      switch (position) {
        case "top":
          cssVarValue = document.documentElement.clientHeight - e.pageY;
          break;
        case "right":
          cssVarValue = e.pageX;
          break;
        case "left":
          cssVarValue = document.documentElement.clientWidth - e.pageX;
          break;
        case "bottom":
          cssVarValue = e.pageY;
          break;
      }
      document.documentElement.style.setProperty(cssVarName, `${cssVarValue}px`);
      return () => {
        document.documentElement.style.removeProperty(cssVarName);
      };
    },
    [name, position],
  );

  const handlePointerUp = useCallback(() => {
    const handler = handlePointerMove;
    document.removeEventListener("pointermove", handler);
    document.documentElement.classList.remove("cursor-row-resize", "cursor-col-resize");

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
    <div className={clsx(["p8n-resize-area", position])}>
      <button className="area-button" type="button" onPointerDown={handlePointerDown}></button>
    </div>
  );
}
