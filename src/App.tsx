import React, { useState } from "react";
import ExampleSelector from "./ExampleSelector";
import Counter from "./Counter";
import ProgressBar from "./ProgressBar";
import Clock from "./Clock";

const OPTIONS = [
  { label: "Counter", Component: Counter },
  { label: "ProgressBar", Component: ProgressBar },
  { label: "Clock", Component: Clock },
];

export default function App() {
  const [exampleId, setExampleId] = useState(2);

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
