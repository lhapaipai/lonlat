import { useCallback } from "react";
import cn from "classnames";
import "./ResizeArea.scss";

interface Props {
  name: string;
  position: "top" | "bottom" | "left" | "right";
}

export default function ResizeArea({ name, position }: Props) {
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
