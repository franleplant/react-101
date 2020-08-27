import React, { ReactNode } from "react";

export class ClassHook extends React.Component {
  firstRender = true;
  state: { [hookIndex: number]: any } = {};
  stateSetters: { [hookIndex: number]: any } = {};
  hookIndex = 0;
  //hookIds = {
  //useState: [],
  //};

  useState<T>(initialValue?: T): [T, (v: T) => any] {
    const hookIndex = this.hookIndex;
    // what is the next hook? you guessed it
    this.hookIndex++;

    if (this.firstRender) {
      this.state[hookIndex] = initialValue;
      const setValue = (newValue: T) => {
        this.setState({ [hookIndex]: newValue });
      };
      this.stateSetters[hookIndex] = setValue;
    }

    //console.log("setState", this.stateSetters[hookIndex])

    return [this.state[hookIndex], this.stateSetters[hookIndex]];
  }

  componentDidMount() {
    this.firstRender = false;
  }

  customRender(): ReactNode {
    //THIS IS THE THING THAT IS OVERWRITTEN BY USERS
    return null;
  }

  render() {
    console.log("render");
    this.hookIndex = 0;
    console.log("before custom render", this.hookIndex);

    const result = this.customRender();
    //TODO cleanup

    console.log("after custom render", this.hookIndex);
    return result;
  }
}

export default class MyComponent extends ClassHook {
  customRender() {
    const [renderId, setRenderId] = this.useState(0);
    const [date, setDate] = this.useState(new Date());

    // This works but triggers too much renders
    //setInterval(() => {
    //console.log("==============")
    //setDate(new Date())
    //}, 10000)

    return (
      <div>
        <div onClick={() => setRenderId(renderId + 1)}>
          Hello {renderId} at {date.toLocaleTimeString()}
        </div>
        <button onClick={() => setDate(new Date())}>Refresh date</button>
      </div>
    );
  }
}
