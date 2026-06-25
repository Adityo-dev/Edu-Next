import { useEffect, useState } from 'react';

/**
 * A custom hook to debounce any fast-changing value.
 * @param value The input value to debounce (string, number, etc.)
 * @param delay The timeout in milliseconds (default: 500ms)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
