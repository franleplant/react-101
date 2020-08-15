import { useEffect, useRef } from "react";
import useIsMounted from "./useIsMounted";

export type Callback = () => any;

// Safe useTimeout (set the callback right away)
export function useTimeout(callback: Callback, ms: number) {
  const isMounted = useIsMounted();
  const id = useRef<any>();

  useEffect(() => {
    id.current = setTimeout(() => {
      if (isMounted.current) {
        callback();
      }
    }, ms);

    return () => clearTimeout(id.current);
  }, [isMounted, ms, callback]);
}

// Safe useSetTimeout (set the timeout whenever you want)
export function useSetTimeout(): (callback: Callback, ms: number) => void {
  const isMounted = useIsMounted();
  const id = useRef<any>();

  useEffect(() => () => clearTimeout(id.current), []);

  return (callback: Callback, ms: number) => {
    id.current = setTimeout(() => {
      if (isMounted.current) {
        callback();
      }
    }, ms);
  };
}
