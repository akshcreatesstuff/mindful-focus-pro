import { breathPhase, formatTime } from "../countdown";
import { useCountdown } from "../useCountdown";
import { TimerControls, TimerOptions } from "./TimerButtons";

const options = [
  { value: 120, label: "2 min" },
  { value: 180, label: "3 min" },
  { value: 300, label: "5 min" },
];

export default function BreathTimer({ onComplete }: { onComplete: () => void }) {
  const timer = useCountdown(120, onComplete);
  const phase = breathPhase(timer.duration - timer.remaining);
  const label = {
    idle: "breathe",
    running: phase === "inhale" ? "breathe in" : "breathe out",
    paused: "paused",
    done: "complete ✓",
  }[timer.status];

  return (
    <>
      <TimerOptions options={options} selected={timer.duration} onSelect={timer.reset} />
      <div className="breath-display">
        <div className={timer.status === "running" ? `breath-ring ${phase}` : "breath-ring"}>
          <div className="breath-ring-inner" />
        </div>
        <div className="breath-label" aria-live="polite">
          {label}
        </div>
        <div className="timer-display" role="timer">
          {formatTime(timer.remaining)}
        </div>
      </div>
      <TimerControls status={timer.status} onToggle={timer.toggle} onReset={() => timer.reset()} />
    </>
  );
}
