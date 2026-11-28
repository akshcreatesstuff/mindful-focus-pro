import { createContext } from "react";
import type { TimerState } from "../practices/countdown";
import type { PracticeKind, Progress, SessionRecord } from "./types";

export type ProgressActions = {
  saveTimer: (kind: PracticeKind, timer: TimerState) => void;
  completeTimer: (kind: PracticeKind, timer: TimerState, session: SessionRecord | null) => void;
  saveChecklist: (listId: string, checked: boolean[]) => void;
  reset: () => void;
  retry: () => void;
};

export type ProgressState = {
  /** null until the saved data has loaded */
  progress: Progress | null;
  loadError: string;
  saveError: string;
};

export const ProgressContext = createContext<(ProgressState & ProgressActions) | null>(null);
