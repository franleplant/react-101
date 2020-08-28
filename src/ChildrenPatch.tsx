import React, { useState } from "react";

export default function ChildrenPatch() {
  return (
    <div className="flow">
      <Italics>
        <div>
          <p>Hello </p>
        </div>
      </Italics>
    </div>
  );
}

export interface IProps {
  children: React.ReactNode;
}

export function Italics(props: IProps) {

  function italicise(child: React.ReactNode, index: number): React.ReactNode {
    // string, null, boolean, undefined, number
    if (!React.isValidElement(child)) {
      return child
    }

    let additionalProps = {}
    // only add custom style to native elements
    if (typeof child.type === "string") {
      additionalProps = {
        style: {fontStyle: 'italic'}
      }
    }

    const patchedChildren = React.Children.map(child.props.children, italicise)

    return React.cloneElement(child, additionalProps, patchedChildren)
  }

 const children = React.Children.map(props.children, italicise);

  return <>{children}</>
}

