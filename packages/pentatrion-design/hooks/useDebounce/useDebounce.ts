import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): [T, Dispatch<SetStateAction<T>>] {
  const [debouncedValue, setImmediateValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setImmediateValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return [debouncedValue, setImmediateValue];
}
