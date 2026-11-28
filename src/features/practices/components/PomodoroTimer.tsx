import { useState } from "react";
import { formatTime } from "../countdown";
import { useCountdown } from "../useCountdown";
import { TimerControls, TimerOptions } from "./TimerButtons";

type Mode = "work" | "short" | "long";

const seconds: Record<Mode, number> = { work: 25 * 60, short: 5 * 60, long: 10 * 60 };

const options: { value: Mode; label: string }[] = [
  { value: "work", label: "25 min work" },
  { value: "short", label: "5 min rest" },
  { value: "long", label: "10 min rest" },
];

export default function PomodoroTimer({ onWorkComplete }: { onWorkComplete: () => void }) {
  const [mode, setMode] = useState<Mode>("work");
  const [sessions, setSessions] = useState(0);
  const timer = useCountdown(seconds.work, () => {
    if (mode === "work") {
      setSessions((count) => count + 1);
      onWorkComplete();
    }
    const message =
      mode === "work" ? "🍅 Session complete! Time to rest." : "✅ Break over. Back to focus!";
    // A short delay lets the screen show 0:00 before the alert blocks it
    setTimeout(() => window.alert(message), 50);
  });
  // The first dot is lit before any session, then one per finished session in each set of four
  const litDots = sessions === 0 ? 1 : sessions % 4;

  function selectMode(next: Mode) {
    setMode(next);
    timer.reset(seconds[next]);
  }

  return (
    <>
      <TimerOptions options={options} selected={mode} onSelect={selectMode} />
      <div className="phase-indicator" aria-label={`${sessions} work sessions completed`}>
        {[0, 1, 2, 3].map((dot) => (
          <div key={dot} className={dot < litDots ? "phase-dot work" : "phase-dot"} />
        ))}
      </div>
      <div className="timer-display" role="timer">
        {formatTime(timer.remaining)}
      </div>
      <TimerControls status={timer.status} onToggle={timer.toggle} onReset={() => timer.reset()} />
    </>
  );
}
