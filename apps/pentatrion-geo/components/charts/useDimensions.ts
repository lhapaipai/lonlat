import { useEventCallback } from "pentatrion-design";
import { RefObject, useEffect, useRef, useState } from "react";

type UseDimensionsProps = {
  marginLeft?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
};

type UseDimensionsReturn = [
  RefObject<HTMLDivElement>,
  Required<UseDimensionsProps> & {
    svgTop: number;
    svgLeft: number;
    svgWidth: number;
    svgHeight: number;
    width: number;
    height: number;
  },
];

export const useDimensions: (
  props?: UseDimensionsProps,
) => UseDimensionsReturn = (props = {}) => {
  const {
    marginLeft = 50,
    marginRight = 50,
    marginTop = 80,
    marginBottom = 25,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null!);

  const size = useRef({
    // fixed position of the svg Element
    svgTop: 0,
    svgLeft: 0,

    svgWidth: 0,
    svgHeight: 0,
    width: 0,
    height: 0,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
  });
  const [, rerender] = useState(0);

  const onResizeStable = useEventCallback(() => {
    const currentElt = containerRef.current;

    const { top, left, width, height } = currentElt.getBoundingClientRect();
    if (size.current.width !== width || size.current.height !== height) {
      size.current = {
        svgTop: top,
        svgLeft: left,
        svgWidth: width,
        svgHeight: height,
        width: width - marginLeft - marginRight,
        height: height - marginTop - marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
      };
    }
    rerender((v) => v + 1);
  });

  useEffect(() => {
    const currentElt = containerRef.current;
    const resizeObserver = new ResizeObserver(onResizeStable);
    resizeObserver.observe(currentElt);
    window.addEventListener("resize", onResizeStable);
    return () => {
      void resizeObserver.unobserve(currentElt);
      window.removeEventListener("resize", onResizeStable);
    };
  }, [rerender, onResizeStable]);

  return [containerRef, size.current];
};
