import React, { useState } from "react";

export default function ChildrenIf() {
  const [cond, setCond] = useState(true);

  return (
    <div className="flow">
      <div>
        <button className="button" onClick={() => setCond((cond) => !cond)}>
          Toggle
        </button>
      </div>

      <div className="card">
        <If cond={cond}>
          <Then>Then branch</Then>
          <Else>else branch</Else>
        </If>
      </div>
    </div>
  );
}

export interface IProps {
  cond: boolean;
  children: React.ReactNode;
}

export function If({ children, cond }: IProps) {
  let thenContent;
  let elseContent;

  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (child.type === Then) {
        thenContent = child.props.children;
      }
      if (child.type === Else) {
        elseContent = child.props.children;
      }

      return;
    }

    throw new Error("wrong children type");
  });

  if (cond) {
    return <>{thenContent}</>;
  } else {
    return <>{elseContent}</>;
  }
}

export function Then(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}

export function Else(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}
