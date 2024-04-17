import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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

export function useRefDebounce<T>(value: T, delay?: number): MutableRefObject<T> {
  const debouncedValueRef = useRef(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedValueRef.current = value;
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValueRef;
}

export function useStateDebounce<T>(
  initialValue: T,
  delay?: number,
): [T, T, (initialValue: SetStateAction<T>, immediate?: boolean) => void] {
  const [value, setImmediateValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  const setValue = useCallback((value: SetStateAction<T>, immediate = false) => {
    setImmediateValue(value);
    if (immediate) {
      setDebouncedValue(value);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [value, debouncedValue, setValue];
}
