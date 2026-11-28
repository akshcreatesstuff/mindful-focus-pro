import { useProgress } from "../../progress/useProgress";
import { breathPhase, formatTime, newTimer, type TimerState } from "../countdown";
import { useCountdown } from "../useCountdown";
import { TimerControls, TimerOptions } from "./TimerButtons";

const options = [
  { value: 120, label: "2 min" },
  { value: 180, label: "3 min" },
  { value: 300, label: "5 min" },
];

export default function BreathTimer({ timer }: { timer: TimerState }) {
  const { saveTimer, completeTimer } = useProgress();
  const { remaining, toggle } = useCountdown(
    timer,
    (next) => saveTimer("breath", next),
    (finished) =>
      completeTimer("breath", finished, {
        kind: "breath",
        seconds: finished.duration,
        at: Date.now(),
      }),
  );
  const phase = breathPhase(timer.duration - remaining);
  const label = {
    idle: "breathe",
    running: phase === "inhale" ? "breathe in" : "breathe out",
    paused: "paused",
    done: "complete ✓",
  }[timer.status];
  const reset = (seconds: number) => saveTimer("breath", newTimer(seconds, "breath"));

  return (
    <>
      <TimerOptions options={options} selected={timer.duration} onSelect={reset} />
      <div className="breath-display">
        <div className={timer.status === "running" ? `breath-ring ${phase}` : "breath-ring"}>
          <div className="breath-ring-inner" />
        </div>
        <div className="breath-label" aria-live="polite">
          {label}
        </div>
        <div className="timer-display" role="timer">
          {formatTime(remaining)}
        </div>
      </div>
      <TimerControls status={timer.status} onToggle={toggle} onReset={() => reset(timer.duration)} />
    </>
  );
}
