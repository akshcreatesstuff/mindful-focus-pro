import { useEffect, useRef, useState } from "react";
import {
  finishTimer,
  pauseTimer,
  secondsRemaining,
  startTimer,
  type TimerState,
} from "./countdown";

const createRunId = () => `r${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

// Drives a saved timer: the state comes in, and every change goes back out to be stored
export function useCountdown(
  timer: TimerState,
  onChange: (next: TimerState) => void,
  onComplete: (finished: TimerState) => void,
) {
  const [now, setNow] = useState(() => Date.now());
  const completedRun = useRef("");
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  });

  useEffect(() => {
    if (timer.status !== "running") return;

    function tick() {
      const time = Date.now();
      setNow(time);
      if (time >= timer.endsAt && completedRun.current !== timer.runId) {
        completedRun.current = timer.runId;
        completeRef.current(finishTimer(timer));
      }
    }

    tick();
    const interval = setInterval(tick, 250);
    return () => clearInterval(interval);
  }, [timer]);

  function toggle() {
    const time = Date.now();
    setNow(time);
    onChange(
      timer.status === "running" ? pauseTimer(timer, time) : startTimer(timer, time, createRunId()),
    );
  }

  return { remaining: secondsRemaining(timer, now), toggle };
}
