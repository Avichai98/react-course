import { useState, useEffect } from 'react';

// A helper function to safely get a value from localStorage.
// It handles cases where window is not defined (SSR) or parsing fails.
function getStoredValue<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const saved = window.localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : defaultValue;
  } catch (error) {
    console.error('Failed to parse localStorage value, using default:', error);
    return defaultValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize state using the lazy initializer form of useState,
  // so we only read from localStorage on the initial render.
  const [value, setValue] = useState(() => getStoredValue(key, defaultValue));

  // This effect runs whenever the value changes, saving it to localStorage.
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}