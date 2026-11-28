// Pure timer helpers, with no React or browser code

export function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

// Time left is worked out from a deadline, so slow background tabs stay accurate
export function secondsLeft(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export type BreathPhase = "inhale" | "exhale";

export function breathPhase(elapsedSeconds: number): BreathPhase {
  return Math.floor(elapsedSeconds / 4) % 2 === 0 ? "inhale" : "exhale";
}
