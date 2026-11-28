import { totalsFor } from "../../progress/progressModel";
import type { Progress } from "../../progress/types";
import { useProgress } from "../../progress/useProgress";
import { formatTime, newTimer } from "../countdown";
import { useCountdown } from "../useCountdown";
import { TimerControls, TimerOptions } from "./TimerButtons";

type Mode = "work" | "short" | "long";

const seconds: Record<Mode, number> = { work: 25 * 60, short: 5 * 60, long: 10 * 60 };

const options: { value: Mode; label: string }[] = [
  { value: "work", label: "25 min work" },
  { value: "short", label: "5 min rest" },
  { value: "long", label: "10 min rest" },
];

export default function PomodoroTimer({ progress }: { progress: Progress }) {
  const { saveTimer, completeTimer } = useProgress();
  const timer = progress.timers.pomodoro;
  const sessions = totalsFor(progress, "pomodoro").count;
  const { remaining, toggle } = useCountdown(
    timer,
    (next) => saveTimer("pomodoro", next),
    (finished) => {
      const isWork = finished.mode === "work";
      completeTimer(
        "pomodoro",
        finished,
        isWork ? { kind: "pomodoro", seconds: finished.duration, at: Date.now() } : null,
      );
      const message = isWork
        ? "🍅 Session complete! Time to rest."
        : "✅ Break over. Back to focus!";
      // A short delay lets the screen show 0:00 before the alert blocks it
      setTimeout(() => window.alert(message), 50);
    },
  );
  // The first dot is lit before any session, then one per finished session in each set of four
  const litDots = sessions === 0 ? 1 : sessions % 4;
  const reset = (mode: Mode) => saveTimer("pomodoro", newTimer(seconds[mode], mode));

  return (
    <>
      <TimerOptions options={options} selected={timer.mode as Mode} onSelect={reset} />
      <div className="phase-indicator" aria-label={`${sessions} work sessions completed`}>
        {[0, 1, 2, 3].map((dot) => (
          <div key={dot} className={dot < litDots ? "phase-dot work" : "phase-dot"} />
        ))}
      </div>
      <div className="timer-display" role="timer">
        {formatTime(remaining)}
      </div>
      <TimerControls
        status={timer.status}
        onToggle={toggle}
        onReset={() => reset(timer.mode as Mode)}
      />
    </>
  );
}
