import React from "react";

export interface IProps {
  // from 0 to 100
  progress: number;
}

export default function ProgressBar(props: IProps) {
  // Ensure it stays between 0 and 100
  const bottomBounded = Math.max(props.progress, 0);
  const topBounded = Math.min(bottomBounded, 100);

  // Dumb alias
  const progress = topBounded;

  return (
    <div className="progress-bar">
      <span className="progress-bar__number">{`${progress} %`}</span>
      <div
        className="progress-bar__progress"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
