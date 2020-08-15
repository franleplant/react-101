import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function onClick() {
    setCount((previousCount) => previousCount + 100);
  }

  return (
    <div>
      <p>{`$ ${count}`}</p>
      <button onClick={onClick}>More money!</button>
    </div>
  );
}
