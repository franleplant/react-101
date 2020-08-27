import React, { useState, useEffect } from "react";

export default function LifeCycleContainer() {
  const [renderId, setRenderId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  function toggleIsMounted() {
    setIsMounted((isMounted) => !isMounted);
  }

  function reRender() {
    console.log("==========");
    setRenderId((id) => id + 1);
  }

  function changeUser() {
    console.log("==========");
    setUserId((id) => id + 1);
  }

  return (
    <div className="flow">
      <div className="inline-flow">
        <button className="button" type="button" onClick={toggleIsMounted}>
          {isMounted ? "unmount" : "mount"}
        </button>
        <button className="button" type="button" onClick={reRender}>
          Re-render
        </button>
        <button className="button" type="button" onClick={changeUser}>
          Change User Id
        </button>
      </div>
      {isMounted && <LifeCycle renderId={renderId} userId={userId} />}
    </div>
  );
}

export interface IProps {
  renderId: number;
  userId: number;
}

export function LifeCycle(props: IProps) {
  const { renderId, userId } = props;
  console.log("render", props);

  useEffect(() => {
    console.log("side effects render", renderId);

    return () => {
      console.log("cleanup render", renderId);
    };
  });

  useEffect(() => {
    console.log("mounted! in render", renderId);

    return () => {
      console.log("unmounted! in render", renderId);
    };
  }, []);

  useEffect(() => {
    console.log(`fetch user ${userId} `);

    return () => {
      console.log(`forget user ${userId} `);
    };
  }, [userId]);

  return (
    <div className="card">
      <h3>Life Cycle</h3>
      <p>{`renderId: ${renderId}`}</p>
      <p>{`userId: ${userId}`}</p>
    </div>
  );
}
