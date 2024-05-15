import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";

const TOLERANCE = 5;

interface Props extends ComponentPropsWithoutRef<"div"> {
  horizontal?: boolean;
}

export const scrollVariants = {
  vertical: {
    inner: "overflow-y-auto h-full",
    shadow: "h-1 left-0 right-0",
    shadowStart: "top-0 bg-gradient-to-b from-gray-8/10",
    shadowEnd: "bottom-0 bg-gradient-to-t from-gray-8/10",
    child: "",
  },
  horizontal: {
    inner: "overflow-x-auto",
    shadow: "w-1 top-0 bottom-0",
    shadowStart: "left-0 bg-gradient-to-r from-gray-8/10",
    shadowEnd: "right-0 bg-gradient-to-l from-gray-8/10",
    child: "inline-block",
  },
};

export default function Scroll({ horizontal = false, className, children, ...rest }: Props) {
  const [showStartShadow, setShowStartShadow] = useState(false);
  const [showEndShadow, setShowEndShadow] = useState(false);
  const scrollChildRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const position = horizontal ? "horizontal" : "vertical";

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
    <div className={clsx("ll-scroll-zone", "relative", className)} {...rest}>
      <div
        className={clsx(
          "scroll-shadow z-[1] absolute opacity-0 transition-all",
          scrollVariants[position].shadow,
          scrollVariants[position].shadowStart,
          showStartShadow && "opacity-100",
        )}
      ></div>
      <div
        className={clsx(
          "scroll-shadow z-[1] absolute opacity-0 transition-all",
          scrollVariants[position].shadow,
          scrollVariants[position].shadowEnd,
          showEndShadow && "opacity-100",
        )}
      ></div>
      <div
        className={scrollVariants[position].inner}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        <div className={scrollVariants[position].child} ref={scrollChildRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
