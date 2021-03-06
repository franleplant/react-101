import React, { useState } from "react";
import ExampleSelector from "./ExampleSelector";
import Counter from "./Counter";
import ProgressBar from "./ProgressBar";
import Clock from "./Clock";
import LifeCycle from "./LifeCycle";
import LifeCycleXtreme from "./LifeCycleXtreme";
import ChildrenIf from "./ChildrenIf";
import ChildrenPatch from "./ChildrenPatch";

const OPTIONS = [
  { label: "Counter", Component: Counter },
  { label: "ProgressBar", Component: ProgressBar },
  { label: "Clock", Component: Clock },
  { label: "LifeCycle", Component: LifeCycle },
  { label: "ChildrenIf", Component: ChildrenIf },
  { label: "ChildrenPatch", Component: ChildrenPatch },
  //{ label: "LifeCycleXtreme", Component: LifeCycleXtreme },
];

export default function App() {
  const [exampleId, setExampleId] = useState(0);

  const Example = OPTIONS[exampleId].Component;

  return (
    <div className="container | flow | margin_around">
      <ExampleSelector
        value={exampleId}
        onChange={setExampleId}
        options={OPTIONS}
      />

      <div className="container example">
        <Example />
      </div>
    </div>
  );
}
