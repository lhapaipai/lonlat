import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number, immediateFalsyValue = false) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  if (immediateFalsyValue && !value && debouncedValue !== value) {
    setDebouncedValue(value);
  }

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}
