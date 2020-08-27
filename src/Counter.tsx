import React, { useState } from "react";

export default function CounterContainer() {
  const [renderId, setRenderId] = useState(0);

  return (
    <div className="flow">
      <div>
        <button
          className="button"
          type="button"
          onClick={() => setRenderId((id) => id + 1)}
        >
          Re-render
        </button>
      </div>
      <Counter renderId={renderId} initialMoney={renderId * 100}/>
    </div>
  );
}

export interface IProps {
  renderId: number;
  initialMoney: number;
}

export function Counter({ renderId, initialMoney }: IProps) {
  const [count, setCount] = useState(0);

  console.log("Counter: render", { renderId, count });

  function onClick() {
    setCount((previousCount) => previousCount + 100);
    //setCount(count + 100);
  }

  return (
    <div className="card">
      <p>{`$ ${count}`}</p>
      <button onClick={onClick}>More money!</button>
    </div>
  );
}
