import { useCallback, useEffect, useRef } from "react";

const useIsMounted = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => {
    return mountedRef.current;
  }, []);
};

export default useIsMounted;
