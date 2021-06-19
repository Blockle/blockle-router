import { useRef } from 'react';

export function useRefMemo<T>(initialValue: () => T) {
  const ref = useRef<T>();

  if (!ref.current) {
    ref.current = initialValue();
  }

  return ref.current;
}
