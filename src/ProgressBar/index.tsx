import React, { useState, useEffect, useCallback, useRef } from "react";

import ProgressBar from "./ProgressBar";
import useIsMounted from "../useIsMounted";

export default function ProgressBarContainer() {
  return (
    <div className="flow">
      <div>
        <p>Uploading file</p>
        <FileUploader />
      </div>

      <div>
        <p>Happyness Level</p>
        <HappynessLevel />
      </div>
    </div>
  );
}

export function HappynessLevel() {
  const [level, setLevel] = useState(75);

  return (
    <>
      <input
        type="range"
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
      />
      <ProgressBar progress={level} />
    </>
  );
}

export function FileUploader() {
  const progress = useUploadFile();

  return <ProgressBar progress={progress} />;
}

function useUploadFile(): number {
  const [progress, setProgress] = useState(0);
  const isMounted = useIsMounted();
  const timeoutId = useRef<any>();

  const fakeProgressUpdate = useCallback(() => {
    timeoutId.current = setTimeout(() => {
      if (isMounted.current) {
        setProgress((progress) => {
          const nextProgress = progress + 10;
          if (nextProgress < 100) {
            fakeProgressUpdate();
          }

          return nextProgress;
        });
      }
    }, Math.random() * 1000);
  }, [isMounted]);

  useEffect(() => {
    fakeProgressUpdate();
    return () => {
      window.clearTimeout(timeoutId.current);
    };
  }, [fakeProgressUpdate]);

  return progress;
}
