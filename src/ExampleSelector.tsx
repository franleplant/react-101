import React from "react";

export interface IOptions {
  label: string;
}

export interface IProps {
  options: Array<IOptions>;
  onChange: (exampleId: number) => any;
  value?: number;
}

export default function ExampleSelector(props: IProps) {
  return (
    <div className="example_selector">
      {props.options.map((option, index) => {
        const isSelected = props.value === index;
        const className = ["example_selector__option"];
        if (isSelected) {
          className.push("example_selector__option__selected");
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => props.onChange(index)}
            className={className.join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
