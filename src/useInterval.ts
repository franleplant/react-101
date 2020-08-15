import { useEffect, useRef } from "react";
import useIsMounted from "./useIsMounted";

export type Callback = () => any;

// Safe useTimeout (set the callback right away)
export function useInterval(callback: Callback, ms: number) {
  const isMounted = useIsMounted();
  const id = useRef<any>();

  useEffect(() => {
    id.current = setInterval(() => {
      if (isMounted.current) {
        callback();
      }
    }, ms);

    return () => window.clearInterval(id.current);
  }, [isMounted, ms, callback]);
}

//TODO useSetInterval
