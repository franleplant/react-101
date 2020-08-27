import React, { useState, useEffect, useCallback, useRef } from "react";

import { useInterval } from "./useInterval";

export function Clock() {
  const [date, setDate] = useState(() => new Date());

  // Handle mounted state
  const isMounted = useRef(false); // instance.ref0.current = false
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, [])

  // Handle setInterval
  const id = useRef<any>();
  useEffect(() => {
    id.current = setInterval(() => {
      if (isMounted.current) {
        setDate(new Date());
      }
    }, 1000);

    return () => {
      window.clearInterval(id.current);
    };
  }, []);

  return <div>{date.toLocaleTimeString()}</div>;
}

// A more abstracted version
export default function ClockV2() {
  const [date, setDate] = useState(new Date());
  const update = useCallback(() => setDate(new Date()), []);
  useInterval(update, 1000);

  return <div>{date.toLocaleTimeString()}</div>;
}
