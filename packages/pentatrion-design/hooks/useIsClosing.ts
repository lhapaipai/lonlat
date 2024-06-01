import { useCallback, useEffect, useRef, useState } from "react";

export function useIsClosing(initialValue = false, delay = 500) {
  const [[isOpen, isClosing], setState] = useState([initialValue, false]);
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => void (isMounted.current = false);
  }, []);
  const setIsOpen = useCallback(
    (newState: boolean) => {
      if (newState) {
        setState([true, false]);
      } else {
        setState([true, true]);
        setTimeout(() => {
          isMounted.current && setState([false, false]);
        }, delay);
      }
    },
    [delay],
  );

  return { isOpen, isClosing, setIsOpen };
}
