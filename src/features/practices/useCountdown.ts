import { useEffect, useRef, useState } from "react";
import { secondsLeft } from "./countdown";

export type TimerStatus = "idle" | "running" | "paused" | "done";

export function useCountdown(initialSeconds: number, onComplete: () => void) {
  const [duration, setDuration] = useState(initialSeconds);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const msLeft = useRef(initialSeconds * 1000);
  const deadlineRef = useRef(0);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  });

  useEffect(() => {
    if (status !== "running") return;

    const deadline = Date.now() + msLeft.current;
    const interval = setInterval(() => {
      const left = secondsLeft(deadline, Date.now());
      setRemaining(left);
      if (left === 0) {
        clearInterval(interval);
        setStatus("done");
        completeRef.current();
      }
    }, 250);

    deadlineRef.current = deadline;
    return () => clearInterval(interval);
  }, [status]);

  function reset(seconds = duration) {
    setStatus("idle");
    setDuration(seconds);
    setRemaining(seconds);
    msLeft.current = seconds * 1000;
  }

  function toggle() {
    if (status === "running") {
      msLeft.current = Math.max(0, deadlineRef.current - Date.now());
      setStatus("paused");
      return;
    }
    if (status === "done") {
      msLeft.current = duration * 1000;
      setRemaining(duration);
    }
    setStatus("running");
  }

  return { duration, remaining, status, toggle, reset };
}
