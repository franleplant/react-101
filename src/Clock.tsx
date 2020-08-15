import React, { useState, useEffect, useCallback, useRef } from "react";

import { useInterval } from "./useInterval";

export default function Clock() {
  const [date, setDate] = useState(new Date());
  const isMounted = useRef(false);
  const id = useRef<any>();

  useEffect(() => {
    isMounted.current = true;
    id.current = setInterval(() => {
      if (isMounted.current) {
        setDate(new Date());
      }
    }, 500);

    return () => {
      isMounted.current = false;
      window.clearInterval(id.current);
    };
  }, []);

  return <div>{date.toLocaleTimeString()}</div>;
}

// A more abstracted version
export function ClockV2() {
  const [date, setDate] = useState(new Date());
  const update = useCallback(() => setDate(new Date()), []);
  useInterval(update, 1000);

  return <div>{date.toLocaleTimeString()}</div>;
}
