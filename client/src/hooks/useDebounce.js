import { useRef } from 'react';

function useDebounce(callback, delay) {
  const timer = useRef();

  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
