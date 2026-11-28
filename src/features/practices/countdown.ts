// Pure timer logic, with no React, browser or database code

export type TimerStatus = "idle" | "running" | "paused" | "done";

/** Everything needed to save a timer and restore it later. */
export type TimerState = {
  mode: string;
  duration: number; // seconds
  status: TimerStatus;
  remainingMs: number; // time left while not running
  endsAt: number; // clock time it finishes while running
  runId: string; // identifies one run, so it is only counted once
};

export function newTimer(duration: number, mode: string): TimerState {
  return { mode, duration, status: "idle", remainingMs: duration * 1000, endsAt: 0, runId: "" };
}

export function startTimer(timer: TimerState, now: number, newRunId: string): TimerState {
  const resuming = timer.status === "paused";
  const remainingMs = resuming ? timer.remainingMs : timer.duration * 1000;
  return {
    ...timer,
    status: "running",
    remainingMs,
    endsAt: now + remainingMs,
    runId: resuming ? timer.runId : newRunId,
  };
}

export function pauseTimer(timer: TimerState, now: number): TimerState {
  return { ...timer, status: "paused", remainingMs: Math.max(0, timer.endsAt - now), endsAt: 0 };
}

export function finishTimer(timer: TimerState): TimerState {
  return { ...timer, status: "done", remainingMs: 0, endsAt: 0 };
}

// While running, time left comes from the end time, so closed or slow tabs stay accurate
export function secondsRemaining(timer: TimerState, now: number) {
  const ms = timer.status === "running" ? timer.endsAt - now : timer.remainingMs;
  return Math.min(timer.duration, Math.max(0, Math.ceil(ms / 1000)));
}

export function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export type BreathPhase = "inhale" | "exhale";

export function breathPhase(elapsedSeconds: number): BreathPhase {
  return Math.floor(elapsedSeconds / 4) % 2 === 0 ? "inhale" : "exhale";
}
