import { newTimer } from "../practices/countdown";
import type { PracticeKind, Progress } from "./types";

export function emptyProgress(carriedOver = 0): Progress {
  return {
    carriedOver,
    completed: {},
    timers: { breath: newTimer(120, "breath"), pomodoro: newTimer(25 * 60, "work") },
    checklists: {},
  };
}

// Fills any gaps in stored data with the starting values
export function normalizeProgress(stored: Partial<Progress>): Progress {
  const base = emptyProgress();
  return {
    carriedOver: stored.carriedOver ?? 0,
    completed: stored.completed ?? {},
    timers: { ...base.timers, ...stored.timers },
    checklists: stored.checklists ?? {},
  };
}

export function streakOf(progress: Progress) {
  return progress.carriedOver + Object.keys(progress.completed).length;
}

export function totalsFor(progress: Progress, kind: PracticeKind) {
  const sessions = Object.values(progress.completed).filter((item) => item.kind === kind);
  const seconds = sessions.reduce((sum, item) => sum + item.seconds, 0);
  return { count: sessions.length, minutes: Math.round(seconds / 60) };
}
