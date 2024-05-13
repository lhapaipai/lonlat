import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import "./Scroll.scss";

const TOLERANCE = 5;

interface Props extends ComponentPropsWithoutRef<"div"> {
  horizontal?: boolean;
}
export default function Scroll({ horizontal = false, className, children, ...rest }: Props) {
  const [showStartShadow, setShowStartShadow] = useState(false);
  const [showEndShadow, setShowEndShadow] = useState(false);
  const scrollChildRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const setShadows = (container: HTMLDivElement | null, child: HTMLDivElement | null) => {
    if (!container || !child) {
      return;
    }

    const containerRect = container.getBoundingClientRect();

    const childRect = child.getBoundingClientRect();

    const isOnStartEdge = horizontal
      ? containerRect.left - childRect.left < TOLERANCE
      : containerRect.top - childRect.top < TOLERANCE;

    const isOnEndEdge = horizontal
      ? childRect.right - containerRect.right < TOLERANCE
      : childRect.bottom - containerRect.bottom < TOLERANCE;

    setShowStartShadow((previousShowStartShadow) =>
      isOnStartEdge === previousShowStartShadow
        ? !previousShowStartShadow
        : previousShowStartShadow,
    );

    setShowEndShadow((previousShowEndShadow) =>
      isOnEndEdge === previousShowEndShadow ? !previousShowEndShadow : previousShowEndShadow,
    );
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setShadows(scrollContainerRef.current, scrollChildRef.current);
    });
    resizeObserver.observe(scrollChildRef.current!);
    resizeObserver.observe(scrollContainerRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  });

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    if (!scrollChildRef?.current) {
      return;
    }
    setShadows(event.currentTarget, scrollChildRef.current);
  }

  return (
    <div
      className={clsx("ll-scroll-zone", horizontal ? "horizontal" : "vertical", className)}
      {...rest}
    >
      <div className={clsx("scroll-shadow", "start", showStartShadow && "visible")}></div>
      <div className={clsx("scroll-shadow", "end", showEndShadow && "visible")}></div>
      <div className="scroll-inner" ref={scrollContainerRef} onScroll={handleScroll}>
        <div className="scroll-child" ref={scrollChildRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
