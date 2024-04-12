import { useCallback, useEffect } from "react";
import cn from "classnames";
import "./ResizeArea.scss";

interface Props {
  name: string;
  position: "top" | "bottom" | "left" | "right";
  initialValue?: number;
}

export default function ResizeArea({ name, position, initialValue }: Props) {
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

    return () => {
      document.removeEventListener("pointermove", handler);
    };
  }, [handlePointerMove]);

  function handlePointerDown() {
    document.addEventListener("pointerup", handlePointerUp, { once: true });
    document.addEventListener("pointermove", handlePointerMove);
  }

  return (
    <div className={cn(["ll-resize-area-container", position])}>
      <button className="area-button" type="button" onPointerDown={handlePointerDown}></button>
    </div>
  );
}